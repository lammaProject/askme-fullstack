import prisma from "@/lib/prisma";

export default async function sendMessage({
  chatId,
  text,
}: {
  chatId: string;
  text: string;
}) {
  await prisma.chat.update({
    where: {
      id: chatId,
    },
    data: {
      text,
    },
  });
}
