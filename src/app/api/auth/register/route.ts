import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import {
  RegisterUserInput,
  RegisterUserSchema,
} from "../../../../../lib/validations/user.schema";
import { hash } from "bcryptjs";
import prisma from "../../../../../lib/prisma";
import { getEnvVariable, getErrorResponse } from "../../../../../lib/helpres";
import { signJWT } from "../../../../../lib/token";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RegisterUserInput;
    const data = RegisterUserSchema.parse(body);

    const hashedPassword = await hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        photo: data.photo,
      },
    });

    const JWT_EXPIRES_IN = getEnvVariable("JWT_EXPIRES_IN");

    const token = await signJWT(
      { sub: user.id },
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
        data: { user: { ...user, password: undefined, token } },
      }),
      {
        status: 201,
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
        value: user.name,
      }),
    ]);

    return response;
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error);
    }

    if (error.code === "P2002") {
      return getErrorResponse(409, "user with that email already exists");
    }

    return getErrorResponse(500, error.message);
  }
}
