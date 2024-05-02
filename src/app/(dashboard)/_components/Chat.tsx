"use client";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { socket } from "@/socket";
import { useDashboard } from "../../../../store/store";

export default function Chat({ data }: { data: any }) {
  const queryClient = useQueryClient();

  const [{ username }] = useCookies();

  const [chat, setChat] = useState<{
    username: string;
    chatAll: String;
    usernameSend: string;
    text: {}[];
  }>();
  const [value, setValue] = useState("");
  const [repeatOnline, setRepeatOnline] = useState(3);

  const setIsOnlineChat = useDashboard((store: any) => store.setIsOnlineInChat);

  useEffect(() => {
    if (data) {
      setChat(data.data.chat);
      socket.emit("chat", { roomId: data.data.chat.chatAll, username });
    }
  }, [data]);

  useEffect(() => {
    socket.on(`isOnline`, onConnect);

    function onConnect(args: string) {
      console.log(args);
      if (args !== username) setIsOnlineChat(true);
    }

    return () => {
      socket.off("isOnline", onConnect);
    };
  }, []);

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

  const mutation = useMutation({
    mutationKey: ["chatUpdate"],
    mutationFn: (newTodo: any) => {
      return axios.post("/api/chat", newTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("chat");
    },
  });

  const handleInputMessage = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <div
      className={"flex flex-col justify-between bg-primary p-4 rounded-[15px]"}
    >
      <div className={"mb-2 max-h-[60vh] overflow-y-auto"}>
        {chat?.text?.length &&
          chat?.text.map((i: any, index) => {
            if (username in i) {
              return (
                <div key={index} className="chat chat-end">
                  <div className="chat-bubble">{Object.values(i)}</div>
                </div>
              );
            }

            return (
              <div key={index} className="chat chat-start">
                <div className="chat-bubble">{Object.values(i)}</div>
              </div>
            );
          })}
      </div>

      <div className={"w-full grid grid-cols-3"}>
        <textarea
          className="textarea textarea-accent col-span-2 mr-2 resize-none"
          placeholder="Написать сообщение"
          onChange={handleInputMessage}
          value={value}
        />
        <button
          disabled={!value}
          onClick={() => {
            mutation.mutate({
              chatAll: chat?.chatAll,
              text: { [username]: value },
            });

            setValue("");
          }}
          className="btn btn-accent h-full"
        >
          Отправить
        </button>
      </div>
    </div>
  );
}
