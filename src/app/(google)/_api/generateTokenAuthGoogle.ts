import { http } from "@/http";

export const generateTokenAuthGoogle = async (code: string) => {
  await http.post("/auth/googleAuth", { code });
};
