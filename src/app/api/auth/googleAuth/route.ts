import { google } from "googleapis";
import * as process from "process";
import { NextRequest, NextResponse } from "next/server";
import { getEnvVariable, getErrorResponse } from "@/lib/helpres";
import { signJWT } from "@/lib/auth/token";
import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";

const oauth2 = google.oauth2("v2");
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL,
);

const defaultScope = ["https://www.googleapis.com/auth/userinfo.profile"];
export function GET() {
  const url = oauth2Client.generateAuthUrl({
    scope: defaultScope,
  });

  return NextResponse.json({ location: url });
}

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  if (code) {
    try {
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);
      const { data } = await oauth2.userinfo.get({ auth: oauth2Client });

      if (data) {
        const JWT_EXPIRES_IN = getEnvVariable("JWT_EXPIRES_IN");

        const token = await signJWT(
          { sub: data.id! },
          { exp: `${JWT_EXPIRES_IN}m` },
        );

        const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60;

        const cookieOptions = {
          name: "token",
          value: token,
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV !== "development",
          maxAge: tokenMaxAge,
        };

        const response = new NextResponse(
          JSON.stringify({
            status: "success",
            token: cookieOptions,
            username: {
              name: "username",
              value: data.name,
            },
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        );

        await Promise.all([
          response.cookies.set(cookieOptions),
          response.cookies.set({
            name: "logged-in",
            value: "true",
            maxAge: tokenMaxAge,
          }),
          response.cookies.set({
            name: "username",
            value: data.name!,
          }),
        ]);

        const isUser = await prisma.user.findUnique({
          where: {
            email: data.name!,
          },
        });

        if (isUser) {
          return response;
        } else {
          const hashedPassword = await hash(data.id!, 12);

          await prisma.user.create({
            data: {
              id: data.id!,
              name: data.family_name!,
              email: data.name!,
              password: hashedPassword,
              photo: data.picture,
            },
          });
        }

        return response;
      }
    } catch (error) {
      return getErrorResponse(500, `${error}`);
    }
  }

  return getErrorResponse(500, "Нет пришел code");
}
