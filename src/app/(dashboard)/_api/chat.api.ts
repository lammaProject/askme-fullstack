import { http } from "@/http";
import { Chat, GetChat } from "@/types/dashboard.interface";

export const getChatUsers = async (username: string, usernameSend: string) => {
  const { data } = await http.get<GetChat>(
    `/chat?username=${username}&usernameSend=${usernameSend}`,
  );
  return data;
};

export const sendMessage = async (
  body: Omit<Chat, "username" | "usernameSend" | "text"> & { text: {} },
) => {
  const { data } = await http.patch("/chat", body);
  return data;
};
