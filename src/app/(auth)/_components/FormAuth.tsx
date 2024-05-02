"use client";
import { HTMLInputTypeAttribute, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSocket } from "../../../../store/store";

interface FormAuth {
  title: string;
  items: { type: HTMLInputTypeAttribute; name: string; placeholder: string }[];
  messageSuccess: string;
  buttonText: string;
  titleMessage: string;
  link: string;
  linkMessage: string;
  data: (formData: FormData) => {};
  linkApi: "/api/auth/login" | "/api/auth/register";
}

export default function FormAuth({
  title,
  items,
  buttonText,
  titleMessage,
  link,
  linkMessage,
  data,
  linkApi,
}: FormAuth) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const navigate = useRouter();

  const setSocketDisconnect = useSocket((store) => store.setDisconnect);
  const actionForm = (formData: FormData) => {
    setLoading(true);

    axios
      .post(linkApi, data(formData))
      .then((res) => {
        if (res.data.status === "success") {
          setSocketDisconnect(false);
          navigate.push("/");
          setLoading(false);
        }
        setLoading(false);
      })
      .catch((e) => {
        setStatus(e.response.data.message);
        setLoading(false);
      });
  };

  return (
    <div>
      <h1 className={"card-title"}>{title}</h1>
      <form className={"card-body"} action={actionForm}>
        {items.map((input, index) => {
          return (
            <input
              className="input input-bordered flex items-center gap-2"
              key={index}
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              required={true}
            />
          );
        })}

        {loading ? (
          <span className="loading loading-ball loading-lg"></span>
        ) : (
          <button className={"btn"} type={"submit"}>
            {buttonText}
          </button>
        )}
        {status && (
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{status}</span>
          </div>
        )}
      </form>

      <div className={"card items-center"}>
        <h1 className={"card-title"}>{titleMessage}</h1>
        <Link href={link}>{linkMessage}</Link>
      </div>
    </div>
  );
}
