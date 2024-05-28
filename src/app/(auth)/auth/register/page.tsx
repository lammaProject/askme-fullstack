import FormAuth from "@/app/(auth)/_components/FormAuth/FormAuth";

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
      linkApi={"/auth/register"}
      data={["name", "email", "password", "passwordConfirm"]}
      messageSuccess={"Вы успешно зарегестрировались!"}
      buttonText={"Зарегистрироваться"}
      titleMessage={"У вас уже есть аккаунт?"}
      link={"/auth"}
      linkMessage={"Войти"}
    />
  );
}
