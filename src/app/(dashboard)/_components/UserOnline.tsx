"use client";

import Link from "next/link";
export default function UserOnline({
  user,
  name,
}: {
  user: string;
  name: string;
}) {
  console.log(user, name, "namecheck");
  return (
    <Link
      href={`/dashboard/${name}/${user}`}
      key={user}
      className={"flex items-center"}
    >
      {user}
    </Link>
  );
}
