export interface SocketState {
  disconnect: boolean;
  setDisconnect: (by: boolean) => void;
}

type isOnlineInChat = {
  username: string;
  usernameSend: string;
  isOnline: boolean;
};

export interface DashboardState {
  isOnlineInChat: isOnlineInChat;
  openChat: boolean;
  setIsOnlineInChat: (by: isOnlineInChat) => void;
  setOpenChat: (by: boolean) => void;
}
