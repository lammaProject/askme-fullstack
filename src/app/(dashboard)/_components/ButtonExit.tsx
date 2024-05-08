"use client";

import { useRouter } from "next/navigation";
import { http } from "@/http";

export const ButtonExit = () => {
  const navigate = useRouter();

  const handleExit = async () => {
    await http.get("/auth/logout").then(() => navigate.push("/auth"));
  };

  return (
    <button onClick={handleExit} className={"btn"}>
      Выход
    </button>
  );
};
