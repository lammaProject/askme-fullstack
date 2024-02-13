import Link from "next/link";
import prisma from "../../../../../lib/prisma";
import { cookies } from "next/headers";
import { status, statusColor } from "@/app/(ask)/ask/group/constants";

export default async function Page() {
  const name = cookies().get("name")?.value;
  const data = await prisma.ask.findMany({
    where: {
      name,
    },
  });

  return (
    <div className={"w-[100%]"}>
      <h1>Все ваши вопросы</h1>
      <div className={"grid grid-cols-2 gap-2 w-[100%]"}>
        {data.map((i, index) => (
          <div key={index} className={"bg-gray-600"}>
            {index + 1}
            <h1>{i.text}</h1>
            <p className={`text-[${statusColor[i.status]}] `}>
              {status[i.status]}
            </p>
            {i?.answer && <p className={"text-black"}>{i.answer}</p>}
          </div>
        ))}

        <Link href={"/ask/create"}>Задать вопрос</Link>
      </div>
    </div>
  );
}
