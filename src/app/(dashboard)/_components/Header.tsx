"use server";
import ChangeTheme from "@/app/_components/ChangeTheme";
import { ButtonExit } from "@/app/(dashboard)/_components/ButtonExit";
import { cookies } from "next/headers";
import Avatar from "@/app/(dashboard)/_components/Avatar";

const Header = async () => {
  let theme = cookies().get("theme")?.value;
  if (!theme) theme = "autumn";
  return (
    <header className={"mb-2"}>
      <div className="p-2 card bg-base-300 rounded-box items-center flex-row justify-between">
        <Avatar />
        <div className={"flex items-center gap-4"}>
          <ChangeTheme defaultChecked={theme} />
          <ButtonExit />
        </div>
      </div>
    </header>
  );
};

export default Header;
