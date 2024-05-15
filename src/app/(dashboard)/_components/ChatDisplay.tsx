"use client";

import React, { useEffect, useRef } from "react";
import { Chat } from "@/types/dashboard.interface";

const ChatDisplay = ({ chat, username }: { chat?: Chat; username: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chat)
      ref.current?.scrollTo({
        top: ref.current!.scrollHeight,
        behavior: "smooth",
      });
  }, [chat]);

  const message = (index: number, i: string, className: string) => (
    <div key={index} className={"chat mb-2 " + className}>
      <div className="chat-bubble">{Object.values(i)}</div>
    </div>
  );

  return (
    <div ref={ref} className={"mb-2 max-h-[60vh] overflow-y-auto"}>
      {chat?.text?.length &&
        chat?.text.map((i: any, index: number) => {
          if (i.hasOwnProperty(username)) {
            return message(index, i, "chat-end transform");
          }

          return message(index, i, "chat-start");
        })}
    </div>
  );
};

export default ChatDisplay;
