"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { generateTokenAuthGoogle } from "@/app/(google)/_api/generateTokenAuthGoogle";
import useTryCatch from "@/hooks/useTryCatch";

export default function Page() {
  const router = useRouter();
  const code = useSearchParams().get("code");

  const [tryFn] = useTryCatch();

  useEffect(() => {
    if (code)
      tryFn(
        () => generateTokenAuthGoogle(code),
        () => alert("ERROR"),
      );

    setTimeout(() => {
      router.push("/");
    }, 2000);
  }, []);

  return <></>;
}
