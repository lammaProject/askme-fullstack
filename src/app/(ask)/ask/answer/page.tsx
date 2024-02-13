"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "../../../../../lib/prisma";
import answerAction from "@/app/(ask)/actions/answer.action";
import FormAnswer from "@/app/(ask)/_components/FormAnswer/FormAnswer";

export default async function Page() {
  const nameCookie = cookies().get("name")?.value;
  if (nameCookie !== "АнтонАдминВеликий") return redirect("/");

  const data = await prisma.ask.findMany({
    where: {
      answer: null,
    },
  });

  if (!data?.length) return <div>Ничего нет</div>;

  return (
    <div>
      {data.map(({ id, name, text }) => (
        <FormAnswer id={id} name={name} text={text} />
      ))}
    </div>
  );
}
