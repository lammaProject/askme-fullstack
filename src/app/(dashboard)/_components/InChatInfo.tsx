"use client";

import { useCookies } from "react-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useDashboard } from "@/app/_providers/store.provider";

export default function InChatInfo() {
  const usernameSend = usePathname().split("/")[3];

  const [{ username }] = useCookies();

  const redirect = useRouter();

  const setOpenChat = useDashboard((store) => store.setOpenChat);
  const online = useDashboard((store) => store.isOnlineInChat);

  console.log(online);
  const handleExit = () => {
    setOpenChat(false);
    redirect.replace("/dashboard");
  };

  return (
    <div className={"bg-neutral rounded-[15px] p-4 flex flex-col"}>
      {online.isOnline && (
        <div
          className={
            "bg-success text-white rounded-[15px] text-center mb-2 p-2"
          }
        >
          Все пользователи в чате ✔
        </div>
      )}

      <input
        disabled
        type="text"
        placeholder={username}
        className="input input-bordered mb-2 w-full"
      />
      <div className={"text-primary-secondary flex justify-center mb-2"}>
        <p>и</p>
      </div>
      <input
        disabled
        type="text"
        placeholder={usernameSend}
        className={`input mb-2 w-full color-secondary`}
      />
      <button onClick={handleExit} className="btn btn-error">
        Выйти из чата
      </button>
    </div>
  );
}
