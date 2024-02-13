import FormAuth from "@/app/(auth)/_components/FormAuth";
import registerAction from "@/app/(auth)/actions/register.action";

export default function Page() {
  return (
    <FormAuth
      title={"Регистрация"}
      items={[
        { type: "text", name: "name", placeholder: "name" },
        { type: "password", name: "password", placeholder: "password" },
        { type: "email", name: "email", placeholder: "email" },
      ]}
      action={registerAction}
      messageSuccess={"Вы успешно зарегестрировались!"}
      buttonText={"Зарегестрироваться"}
      titleMessage={"У вас уже есть аккаунт?"}
      link={"/auth"}
      linkMessage={"Войти"}
    />
  );
}
