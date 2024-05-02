import { NextRequest, NextResponse } from "next/server";
import { getErrorResponse } from "../../../../../lib/helpres";
import prisma from "../../../../../lib/prisma";

export async function GET(req: NextRequest) {
  const userId = req.headers.get("X-USER-ID");

  if (!userId) {
    return getErrorResponse(
      401,
      "You are not logged in, please provide token to gain access",
    );
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });

  return NextResponse.json({
    status: "success",
    data: { user: { ...user, password: undefined } },
  });
}
