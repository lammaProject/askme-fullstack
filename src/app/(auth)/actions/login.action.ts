"use server";
import prisma from "../../../../lib/prisma";
import { User } from "@/app/(auth)/type/user.interface";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function loginAction(formData: FormData) {
  const { name, password }: User = {
    password: formData.get("password") as string,
    name: formData.get("name") as string,
  };

  const account = await prisma.user.findFirst({
    where: {
      name,
      password,
    },
  });

  if (!account) return { error: "Пароль или логин не совпали" };
  else {
    cookies().set("name", account.name);
    cookies().set("token", account.id);
    revalidatePath("/auth");
    return {
      status: "authorized",
      id: account.id,
      name: account.name,
    };
  }
}
