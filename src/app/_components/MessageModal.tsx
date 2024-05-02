"use client";
import { Dispatch, EventHandler, useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useCookies } from "react-cookie";
import sendMessage from "@/app/actions/sendMessage";

const MessageModal = ({
  open,
  name,
  setOpen,
  chatId,
}: {
  open: boolean;
  name: string;
  setOpen: Dispatch<EventHandler<any>>;
  chatId: string;
}) => {
  const [cookeis] = useCookies(["name"]);
  const [messageData, setMessageData] = useState([]);
  const { data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      axios.post("/api/chat/message", {
        chatId,
      }),
  });
  const [myName, setMyName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (data) {
      const na = data.data?.res?.user1 === cookeis.name ? "user1" : "user2";
      const filterdData = data.data.res.text
        .split("message")
        .filter((i: string) => i !== "");

      setMyName(na);
      setMessageData(filterdData);
      console.log(filterdData);
      // console.log(filterdData, "data");
    }
  }, [data]);

  return (
    <dialog open={open} id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{name}</h3>
        {messageData.map((i: string) => {
          console.log(i);
          if (i.startsWith(myName)) {
            return (
              <div className="chat chat-end">
                <div className="chat-bubble">{i}</div>
              </div>
            );
          } else {
            return (
              <div className="chat chat-start">
                <div className="chat-bubble">{i}</div>
              </div>
            );
          }
        })}

        <div className="modal-action">
          <form
            action={async () => {
              await sendMessage({
                chatId,
                text: [...messageData] + "message" + cookeis.name + text,
              });
            }}
          >
            <div className={"join"}>
              <input
                onInput={(value) => setText(value.target.value)}
                type="text"
                placeholder="Type here"
                className="join-item input input-bordered w-full max-w-xs"
              />
              <button className="btn join-item rounded-r-full">
                Отправить
              </button>
            </div>
          </form>
          <button className="btn" onClick={() => setOpen(false)}>
            Закрыть
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default MessageModal;
