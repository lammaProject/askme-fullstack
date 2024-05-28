import { http } from "@/http";

export const generateTokenAuthGoogle = async (code: string) => {
  return await http.post("/auth/googleAuth", { code });
};
