import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export default async function exitLogin() {
  const name = cookies().get("name")?.value;
  if (!name) return { error: "Ошибка" };
  cookies().delete("name");
  cookies().delete("username");
  cookies().delete("token");
  await prisma.user.update({
    where: {
      name,
    },
    data: {
      status: "offline",
    },
  });
}
