import prisma from "../../../../lib/prisma";
import { pusherServer } from "../../../../pusher/pusher";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const { status, answer, idAsk, name } = await req.json();
  const idUser = await prisma.user.findFirst({
    where: {
      name,
    },
  });
  await pusherServer.trigger(`answer_${idUser?.id}`, "answer", true);
  const res = await prisma.ask.update({
    where: {
      id: idAsk,
    },
    data: {
      answer,
      status,
    },
  });

  revalidatePath("/ask/answer");
  if (!res) return;
  return new Response(JSON.stringify({ success: true }));
}
