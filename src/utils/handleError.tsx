"use client";

import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";
import { Notify } from "@/store/store.interface";

const useHandleError = (
  error: Error | AxiosError | unknown,
  setNotifyError: (by: Notify) => void | Dispatch<SetStateAction<Notify>>,
) => {
  setTimeout(() => {
    setNotifyError({ open: false, message: "" });
  }, 3000);

  if (error instanceof AxiosError) {
    return setNotifyError({
      open: true,
      message: error.response?.data.message,
      type: "alert-error",
    });
  }

  if (error instanceof Error) {
    return setNotifyError({
      open: true,
      message: error.message,
      type: "alert-error",
    });
  }
};

export default useHandleError;
