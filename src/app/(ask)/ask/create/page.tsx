import createAsk from "@/app/(ask)/actions/create.action";

export default function Page() {
  return (
    <div className={"min-w-[500px] min-h-[300px]"}>
      <h1 className={"mb-3.5"}>Создание вопроса</h1>
      <form action={createAsk} className={"grid gap-3 col-span-24"}>
        <textarea
          className={"text-black"}
          placeholder={"Текст"}
          name={"text"}
        />
        <button className={"hover:text-red-600"} type={"submit"}>
          Отправить вопрос
        </button>
      </form>
    </div>
  );
}
