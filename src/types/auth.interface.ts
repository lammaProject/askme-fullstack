import { HTMLInputTypeAttribute } from "react";

export interface FormAuth {
  title: string;
  items: { type: HTMLInputTypeAttribute; name: string; placeholder: string }[];
  messageSuccess: string;
  buttonText: string;
  titleMessage: string;
  link: string;
  linkMessage: string;
  data: (formData: FormData) => {};
  linkApi: string;
}
