import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const chatReq = req.nextUrl.searchParams;
  const username = chatReq.get("username");
  const usernameSend = chatReq.get("usernameSend");

  if (!username || !usernameSend) {
    return Response.json({
      status: "bad",
      message: "Нет имени или имени отправителя",
    });
  }

  let chat: any = await prisma.chat.findFirst({
    where: {
      OR: [
        {
          chatAll: username + usernameSend,
        },
        {
          chatAll: usernameSend + username,
        },
      ],
    },
  });

  if (!chat) {
    chat = await prisma.chat.create({
      data: {
        chatAll: username + usernameSend,
        username,
        usernameSend,
        text: [{ [username]: "hello" }],
      },
    });
  }

  return Response.json({ status: "ok", chat });
}

export async function PATCH(req: NextRequest) {
  const { text, chatAll } = await req.json();

  const chat = await prisma.chat.findUnique({
    where: { chatAll },
  });

  if (chat && chat.text) {
    const newText = [...(chat.text as Array<string>), text];
    const newChat = await prisma.chat.update({
      where: { chatAll },
      data: { text: newText },
    });

    return Response.json(newChat);
  }
}
