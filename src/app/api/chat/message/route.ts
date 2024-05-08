import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { chatId } = await req.json();
  const res = await prisma.chat.findFirst({
    where: {
      id: chatId,
    },
  });

  if (!res) return Response.json({ text: "" });
  return Response.json({ res });
}
