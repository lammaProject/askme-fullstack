import { cookies } from "next/headers";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={"flex flex-col p-32"}>{children}</section>;
}
