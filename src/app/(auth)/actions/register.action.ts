"use server";

import prisma from "../../../../lib/prisma";
import { User } from "@/app/(auth)/type/user.interface";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function registerAction(formData: FormData) {
  const { name, password, email }: User = {
    password: formData.get("password") as string,
    name: formData.get("name") as string,
    email: formData.get("email") as string,
  };

  if (password.length < 8) {
    return { error: "Пароль нужно больше 8" };
  }

  try {
    const loginCreate = await prisma.user.create({
      data: { name, password, email },
    });
    cookies().set("token", loginCreate.id);
    cookies().set("name", loginCreate.name);
    revalidatePath("auth/register");
    return loginCreate;
  } catch (err) {
    return { error: err };
  }
}
