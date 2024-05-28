import { useMutation } from "@tanstack/react-query";
import { getGoogleAuth } from "@/app/(auth)/_api/googleAuth.api";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

const useGoogleAuth = (setLoading: Dispatch<SetStateAction<boolean>>) => {
  const navigate = useRouter();

  const googleAuth = useMutation({
    mutationKey: ["google"],
    mutationFn: getGoogleAuth,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: ({ location }) => {
      navigate.push(location);
      setLoading(false);
    },
    onSettled: () => setLoading(false),
  });

  return { googleAuth };
};

export default useGoogleAuth;
