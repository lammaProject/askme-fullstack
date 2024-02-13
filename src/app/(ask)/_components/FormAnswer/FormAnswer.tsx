"use client";
import answerAction from "@/app/(ask)/actions/answer.action";
import { useState } from "react";

export default function FormAnswer(item: Ask) {
  const [formState, setFormState] = useState<Ask>();
  return (
    <form
      className={"flex flex-col"}
      key={item.id}
      action={async () => {
        if (!formState?.status || !formState?.text) return alert("Дурак");
        if (formState && formState.status && formState.text) {
          const res = await answerAction({
            status: formState.status,
            answer: formState.text,
            id: item.id,
          });
        }
      }}
    >
      <h1>{item.name}</h1>

      <textarea
        className={"text-black mb-2"}
        defaultValue={item.text}
        onInput={(event) =>
          setFormState((prev) => ({ ...prev, text: event.target.value }))
        }
      />

      <select
        className={"text-black"}
        name={item.status}
        onChange={(event) =>
          setFormState((prev) => ({ ...prev, status: event.target.value }))
        }
      >
        <option value={"pending"}>pending</option>
        <option value={"read"}>Прочитано</option>
        <option value={"complete"}>Отвечено</option>
        <option value={"not"}>Вопрос отклонен</option>
      </select>

      <button disabled={!formState} type={"submit"}>
        Ответить
      </button>
    </form>
  );
}
