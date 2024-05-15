"use client";

import React, { useEffect, useState } from "react";
import { socket } from "@/socket";
import ChatDisplay from "@/app/(dashboard)/_components/ChatDisplay";
import useChat from "@/app/(dashboard)/_hooks/useChat";
import { useDashboard } from "@/app/_providers/store.provider";
// @ts-ignore
import useSound from "use-sound";

export default function Chat({
  username,
  usernameSend,
}: {
  username: string;
  usernameSend: string;
}) {
  const [notify, setNotify] = useState(false);
  const [play] = useSound("/sounds/sendMessage.mp3", {
    volume: 0.1,
  });

  const [value, setValue] = useState("");
  const [repeatOnline, setRepeatOnline] = useState(3);

  const { chat, addMesage, invalidate } = useChat(username, usernameSend);

  const setOpenChat = useDashboard((store: any) => store.setOpenChat);

  useEffect(() => {
    setOpenChat(true);
  }, []);

  useEffect(() => {
    socket.on(`isOnline`, onIsOnline);
    socket.on("message", onMessage);

    function onIsOnline(args: string) {
      console.log(args);
    }

    async function onMessage(e: string | null) {
      if (e) {
        setNotify((prev) => !prev);
      }
      return await invalidate();
    }

    return () => {
      socket.off("isOnline", onIsOnline);
      socket.off("message", onMessage);
    };
  }, []);

  useEffect(() => {
    play();
  }, [notify]);

  useEffect(() => {
    const check = setTimeout(() => {
      if (repeatOnline < 0)
        return socket.emit("isOnline", {
          username,
        });

      setRepeatOnline((prev) => prev - 1);
    }, 3000);

    return () => {
      clearTimeout(check);
    };
  }, [repeatOnline]);

  const handleInputMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    socket.emit("chat", { message: value });

    addMesage.mutate({
      chatAll: chat!.chatAll,
      text: { [username]: value },
    });

    setValue("");
  };

  return (
    <form
      onSubmit={sendMessage}
      className={"flex flex-col justify-between bg-primary p-4 rounded-[15px]"}
    >
      <ChatDisplay chat={chat} username={username} />

      <div className={"w-full grid grid-cols-3"}>
        <input
          className="textarea textarea-accent col-span-2 mr-2 resize-none"
          placeholder="Написать сообщение"
          onChange={handleInputMessage}
          value={value}
        />
        <button
          type={"submit"}
          disabled={!value}
          className="btn btn-accent h-full"
        >
          Отправить
        </button>
      </div>
    </form>
  );
}
