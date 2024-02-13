import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ButtonExit } from "@/app/_components/ButtonExit";
import Link from "next/link";

export default function Home() {
  const nameUser = cookies().get("name");
  if (!nameUser) return redirect("/auth");
  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1>Привет {nameUser.value}</h1>
      <div className={"mt-2 p-3 flex flex-col items-center"}>
        <h1 className={"mb-2"}>Вот что можно</h1>

        <div className={"flex flex-col items-center"}>
          <Link
            className={"text-red-600 hover:text-red-50"}
            href={"/ask/create"}
          >
            Задать вопрос
          </Link>
          <Link
            className={"text-red-600 hover:text-red-50"}
            href={"/ask/group"}
          >
            Посмотреть все вопросы
          </Link>
        </div>
        {nameUser.value === "АнтонАдминВеликий" && (
          <Link
            className={"text-red-600 hover:text-red-50"}
            href={"/ask/answer"}
          >
            Ответить на вопросы
          </Link>
        )}
      </div>
    </main>
  );
}
