import { ButtonExit } from "@/app/(dashboard)/_components/ButtonExit";
import Avatar from "@/app/(dashboard)/_components/Avatar";
import ChangeTheme from "@/components/ChangeTheme";

const Header = async () => {
  return (
    <header className={"mb-2"}>
      <div className="p-2 card bg-base-300 rounded-box items-center flex-row justify-between">
        <Avatar />
        <div className={"flex items-center gap-4"}>
          <ChangeTheme />
          <ButtonExit />
        </div>
      </div>
    </header>
  );
};

export default Header;
