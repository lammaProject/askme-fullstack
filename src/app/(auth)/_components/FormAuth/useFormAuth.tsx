import { useMutation } from "@tanstack/react-query";
import { postFormAuth } from "@/app/(auth)/_api/formAuth.api";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

const useFormAuth = (setLoading: Dispatch<SetStateAction<boolean>>) => {
  const navigate = useRouter();

  const formAuth = useMutation({
    mutationKey: ["formAuth"],
    mutationFn: ({ linkApi, body }: { linkApi: string; body: any }) =>
      postFormAuth(linkApi, body),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      navigate.push("/dashboard");
      setLoading(false);
    },
    onSettled: () => setLoading(false),
  });

  return { formAuth };
};

export default useFormAuth;
