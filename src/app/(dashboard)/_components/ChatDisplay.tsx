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

  return (
    <div ref={ref} className={"mb-2 max-h-[60vh] overflow-y-auto"}>
      {chat?.text?.length &&
        chat?.text.map((i: any, index: number) => {
          if (i.hasOwnProperty(username)) {
            return (
              <div key={index} className="chat chat-end transform">
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
  );
};

export default ChatDisplay;
