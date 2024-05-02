"use client";
import FormAuth from "@/app/(auth)/_components/FormAuth";

export default function Page() {
  return (
    <FormAuth
      title={"Регистрация"}
      items={[
        { type: "text", name: "name", placeholder: "name" },
        { type: "email", name: "email", placeholder: "email" },
        { type: "password", name: "password", placeholder: "password" },
        {
          type: "password",
          name: "passwordConfirm",
          placeholder: "passwordConfirm",
        },
      ]}
      linkApi={"/api/auth/register"}
      data={(formData) => ({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        passwordConfirm: formData.get("passwordConfirm"),
      })}
      messageSuccess={"Вы успешно зарегестрировались!"}
      buttonText={"Зарегистрироваться"}
      titleMessage={"У вас уже есть аккаунт?"}
      link={"/auth"}
      linkMessage={"Войти"}
    />
  );
}
