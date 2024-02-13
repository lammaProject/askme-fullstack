"use server";
import prisma from "../../../../lib/prisma";
import { revalidatePath } from "next/cache";

export default async function answerAction({
  status,
  answer,
  id,
}: {
  status: Status;
  answer: string;
  id: string;
}) {
  const res = await prisma.ask.update({
    where: {
      id,
    },
    data: {
      answer,
      status,
    },
  });

  if (!res) return;
  revalidatePath("/ask/answer");
}
