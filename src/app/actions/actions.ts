"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function exitLogin() {
  cookies().delete("name");
  cookies().delete("token");
}
