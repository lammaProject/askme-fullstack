"use client";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { useDashboard } from "../../../../store/store";

export default function InChatInfo() {
  const [{ username }] = useCookies();

  const redirect = useRouter();

  const setOpenChat = useDashboard((store: any) => store.setOpenChat);
  const online = useDashboard((store: any) => store.isOnlineInChat);
  const handleExit = () => {
    setOpenChat(false);
    redirect.replace("/dashboard");
  };

  return (
    <div className={"bg-neutral rounded-[15px] p-4 flex flex-col"}>
      {online && (
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
        placeholder={online.toString()}
        className={`input mb-2 w-full color-secondary`}
      />
      <button onClick={handleExit} className="btn btn-error">
        Выйти из чата
      </button>
    </div>
  );
}
