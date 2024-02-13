"use client";
import { useState } from "react";
import axios from "axios";

export default function FormAnswer(item: Ask) {
  const [formState, setFormState] = useState<Ask>();

  async function send() {
    if (!formState?.status || !formState?.text) return alert("НЕЛЬЗЯ");
    await axios.post("/api/ask-answer", {
      name: item.name,
      idAsk: item.id,
      answer: formState.text,
      status: formState.status,
    });
  }

  return (
    <form className={"flex flex-col"} key={item.id} action={() => send()}>
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
