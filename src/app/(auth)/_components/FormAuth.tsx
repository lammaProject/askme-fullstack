"use client";
import { HTMLInputTypeAttribute, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";

interface FormAuth {
  title: string;
  items: { type: HTMLInputTypeAttribute; name: string; placeholder: string }[];
  action: (formData: FormData) => Promise<object | { error: unknown }>;
  messageSuccess: string;
  buttonText: string;
  titleMessage: string;
  link: string;
  linkMessage: string;
}

export default function FormAuth({
  title,
  items,
  action,
  messageSuccess,
  buttonText,
  titleMessage,
  link,
  linkMessage,
}: FormAuth) {
  const [status, setStatus] = useState("");
  const [toMain, setToMain] = useState(false);
  const { pending } = useFormStatus();

  return (
    <form
      action={async (formData) => {
        const res: any = await action(formData);
        if (res?.error) {
          setStatus(res.error);
        }
        if (res?.id) {
          setStatus(`${res.name} ${messageSuccess}`);
          setToMain(true);
        }
      }}
    >
      <h1>{title}</h1>
      {items.map((input, index) => {
        return (
          <input
            key={index}
            className={"bg-[black]"}
            type={input.type}
            name={input.name}
            placeholder={input.placeholder}
            required={true}
          />
        );
      })}

      <button disabled={toMain} type={"submit"}>
        {pending ? "Проверка" : buttonText}
      </button>
      {status && <div>{status}</div>}
      {toMain && (
        <Link className={"text-red-600"} href={"/"}>
          Перейти на главную
        </Link>
      )}

      <div className={"p-2 bg-gray-600 h-28 flex flex-col justify-center"}>
        <h1 className={"text-red-600"}>{titleMessage}</h1>
        <Link href={link}>{linkMessage}</Link>
      </div>
    </form>
  );
}
