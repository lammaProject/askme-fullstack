import { useDashboard } from "@/app/_providers/store.provider";
import handleError from "@/utils/handleError";

const useTryCatch = () => {
  const setNotify = useDashboard((store) => store.setNotify);

  return [
    (fn: () => void, errFn: (error: unknown) => void) => {
      try {
        return fn();
      } catch (error) {
        handleError(error, setNotify);
        return errFn(error);
      }
    },
  ];
};

export default useTryCatch;
