import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getChatUsers, sendMessage } from "@/app/(dashboard)/_api/chat.api";
import { socket } from "@/socket";
import { Chat } from "@/types/dashboard.interface";

const useChat = (username: string, usernameSend: string) => {
  const queryClient = useQueryClient();

  const [chat, setChat] = useState<Chat>();

  const { data } = useQuery({
    queryKey: ["chat"],
    queryFn: () => getChatUsers(username, usernameSend),
  });

  useEffect(() => {
    if (data) {
      setChat(data.chat);
      socket.emit("chat", { roomId: data.chat.chatAll, username });
    }
  }, [data]);

  // update
  const addMesage = useMutation({
    mutationKey: ["chatUpdate"],
    mutationFn: sendMessage,
    onSuccess: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["chat"] });
    },
  });

  const invalidate = async () => {
    return await queryClient.invalidateQueries({ queryKey: ["chat"] });
  };

  return { chat, addMesage, invalidate };
};

export default useChat;
