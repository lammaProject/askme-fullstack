import { http } from "@/http";

export const getUserMe = async () => {
  const { data } = await http.get("/users/me");
  return data;
};
