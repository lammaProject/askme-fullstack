import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { username } = await req.json();

  const name = cookies().get("name")?.value;
  if (!name) return { error: "error" };

  await prisma.chat.create({
    data: {
      username,
      text: JSON.stringify([{ name, message: "Привет!" }]),
    },
  });

  return Response.json({ name, message: "Привет!" });
}
