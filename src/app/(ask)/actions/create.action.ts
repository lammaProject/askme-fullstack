"use server";

import { cookies } from "next/headers";
import prisma from "../../../../lib/prisma";
import { redirect } from "next/navigation";

export default async function createAsk(formData: FormData) {
  const nameCookie = cookies().get("name")?.value;
  if (!nameCookie) return { error: "Ошибка" };

  const text = formData.get("text");

  if (!text) return { error: "Не заполнено поле" };

  const create = await prisma.ask.create({
    data: { name: nameCookie, text, status: "pending" },
  });

  if (!create) return { error: "Что то пошло не так" };
  return redirect("/ask/group");
}
