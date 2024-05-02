"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useBearStore, useSocket } from "../../../../store/store";
import { QueryClient } from "react-query";

export const ButtonExit = () => {
  const queryClient = new QueryClient();
  const navigate = useRouter();

  const setSocketDisconnect = useSocket((store) => store.setDisconnect);

  return (
    <button
      onClick={() => {
        axios.get("/api/auth/logout").then((res) => {
          if (res.data.status === "success") {
            setSocketDisconnect(true);
            queryClient.invalidateQueries({
              queryKey: ["leftside"],
            });
            navigate.push("/auth");
          }
        });
      }}
      type={"submit"}
      className={"btn"}
    >
      Выход
    </button>
  );
};
