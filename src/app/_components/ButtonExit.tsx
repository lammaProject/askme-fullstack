"use client";

import { useTransition } from "react";
import exitLogin from "@/app/actions/actions";
import { useRouter } from "next/navigation";

export const ButtonExit = () => {
  const navigate = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={(e) => {
        startTransition(async () => {
          await exitLogin();
          navigate.push("/auth");
        });
      }}
      type={"submit"}
      className={"bg-[red]"}
    >
      Выйти
    </button>
  );
};
