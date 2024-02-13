import prisma from "../prisma";
import { cookies } from "next/headers";

export interface User {
  name: string;
  password: string;
  email: string;
}

export const findUser = async ({ name, password }: User) => {
  cookies().set("token", "token");
  const account = await prisma.user.findFirst({
    where: {
      name,
      password,
    },
  });

  if (!account)
    return new Response("Неправильное имя или пароль", { status: 400 });
  else
    return Response.json({
      status: "authorized",
      id: account.id,
      name: account.name,
    });
};

export const createUser = async ({ name, password, email }: User) => {
  if (password.length < 8) {
    return new Response("Пароль должен быть больше 8 символов", {
      status: 400,
    });
  }

  try {
    const account = await prisma.user.create({
      data: { name, password, email },
    });
    return Response.json(account, { status: 200 });
  } catch (err) {
    return Response.json({ message: "Ошибка" });
  }
};
