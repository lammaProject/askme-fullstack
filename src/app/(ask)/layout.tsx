import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AskLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className={"flex flex-col p-10"}>
      <div className={"mb-10"}>
        <Link href={"/"}>Главная</Link>
      </div>
      <div>{children}</div>
    </section>
  );
}
