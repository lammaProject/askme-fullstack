import { NextRequest } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  const { user1, user2 } = await req.json();
  console.log(user1, user2);
  const res1 = await prisma.chat.findFirst({
    where: {
      user1,
      user2,
    },
  });

  const res2 = await prisma.chat.findFirst({
    where: {
      user1: user2,
      user2: user1,
    },
  });
  if (res2) {
    return Response.json({ chat: res2.id });
  }
  if (res1) {
    return Response.json({ chat: res1.id });
  }

  return Response.json({ chat: false });
}
