import FormAuth from "@/app/(auth)/_components/FormAuth/FormAuth";

export default function Page() {
  return (
    <FormAuth
      title={"Вход"}
      items={[
        { type: "email", name: "email", placeholder: "email" },
        {
          type: "password",
          name: "password",
          placeholder: "password",
        },
      ]}
      linkApi={"/auth/login"}
      data={["email", "password"]}
      messageSuccess={"Вы вошли"}
      buttonText={"Войти"}
      titleMessage={"Не зарегестрированы?"}
      link={"auth/register"}
      linkMessage={"Зарегестрироваться"}
    />
  );
}
