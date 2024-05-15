import { http } from "@/http";

export const getGoogleAuth = async () => {
  console.log(http.getUri());
  const { data } = await http.get("/auth/googleAuth");
  return data;
};
