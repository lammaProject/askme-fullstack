import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import FormAuth from "@/app/(auth)/_components/FormAuth";
import loginAction from "@/app/(auth)/actions/login.action";
import registerAction from "@/app/(auth)/actions/register.action";

export default function Page() {
  const isToken = cookies().has("token");
  if (isToken) return redirect("/");
  return (
    <FormAuth
      title={"Вход"}
      items={[
        { type: "text", name: "name", placeholder: "name" },
        { type: "password", name: "password", placeholder: "password" },
      ]}
      action={loginAction}
      messageSuccess={"Вы вошли"}
      buttonText={"Войти"}
      titleMessage={"Не зарегестрированы?"}
      link={"auth/register"}
      linkMessage={"Зарегестрироваться"}
    />
  );
}
