"use client";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { socket } from "@/socket";
import UserOnline from "@/app/(dashboard)/_components/UserOnline";
import InChatInfo from "@/app/(dashboard)/_components/InChatInfo";
import { useDashboard } from "@/app/_providers/store.provider";

export function LeftSide() {
  const [errorSocket, setErrorSocket] = useState(false);
  const [data, setData] = useState<Array<string>>([""]);
  const [newUser, setNewUser] = useState("");

  const [{ username }] = useCookies();

  const chat = useDashboard((store) => store.openChat);

  useEffect(() => {
    socket.on("users_online", onConnect);
    socket.on("connect_error", () => {
      socket.off("users_online", onConnect);
      setErrorSocket(true);
    });

    socket.emit("users_online", username);
    socket.emit("users_online", "update");

    function onConnect(usersOnline: Array<string>) {
      const lastUsername = usersOnline[usersOnline.length - 1];
      setData(usersOnline);

      if (username !== lastUsername) {
        setNewUser(lastUsername);
      } else {
        setNewUser(`Добро пожаловать ${username}`);
      }

      setTimeout(() => {
        setNewUser("");
      }, 5000);
    }

    return () => {
      socket.off("users_online", onConnect);
    };
  }, []);

  if (errorSocket)
    return (
      <div className={"mr-2 menu p-6 w-full text-center"}>
        Не удалость подключиться к списку
      </div>
    );

  return (
    <div className={"mr-2"}>
      <ul className="menu bg-base-200 rounded-box p-6 w-full">
        <a className={"text-center text-[18px] mb-2"}>Пользователи онлайн</a>
        {!data?.length ? (
          <span className="loading loading-ring loading-md"></span>
        ) : (
          data.map((user: string) => {
            if (user !== username) {
              return <UserOnline user={user} name={username} />;
            }
          })
        )}
      </ul>

      {chat && <div className={"mt-2"}>{chat && <InChatInfo />}</div>}

      {newUser && (
        <div role="alert" className="alert shadow-lg fixed bottom-0 left-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>

          <div>
            <h3 className="font-bold">Последний пользователь</h3>
            <div className="text-xs">{newUser}</div>
          </div>
          <button onClick={() => setNewUser("")} className="btn btn-sm">
            Хорошо
          </button>
        </div>
      )}
    </div>
  );
}
