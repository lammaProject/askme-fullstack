import Link from "next/link";
import { cookies } from "next/headers";
import { GroupCard } from "@/app/(ask)/_components/GroupCard/GroupCard";

export default async function Page() {
  const name = cookies().get("name")?.value;
  const id = cookies().get("token")?.value;

  return (
    <div className={"w-[100%]"}>
      <h1>Все ваши вопросы</h1>
      <div className={"grid grid-cols-2 gap-2 w-[100%]"}>
        <GroupCard id={id as string} name={name as string} />
        <Link href={"/ask/create"}>Задать вопрос</Link>
      </div>
    </div>
  );
}
