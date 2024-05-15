import { http } from "@/http";

export const postFormAuth = async (linkApi: string, body: any) => {
  const { data } = await http.post(linkApi, body);
  return data;
};
