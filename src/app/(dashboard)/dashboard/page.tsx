import { LeftSide } from "@/app/(dashboard)/_components/LeftSide";
import Chat from "@/app/(dashboard)/_components/Chat";
import { useDashboard } from "../../../../store/store";
import InChatInfo from "@/app/(dashboard)/_components/InChatInfo";

export default function Page() {
  return (
    <div className={"col-span-2"}>
      <div
        className={
          "h-full rounded-[15px] bg-info w-full p-2 flex items-center justify-center"
        }
      >
        <h1>Привет! Я чат</h1>
      </div>
    </div>
  );
}
