type isOnlineInChat = {
  username: string;
  usernameSend: string;
  isOnline: boolean;
};

export type Notify = {
  open: boolean;
  message: string;
  type?: "alert-info" | "alert-success" | "alert-warning" | "alert-error";
};

export interface DashboardState {
  isOnlineInChat: isOnlineInChat;
  openChat: boolean;
  notify: Notify;
  setIsOnlineInChat: (by: isOnlineInChat) => void;
  setOpenChat: (by: boolean) => void;
  setNotify: (by: Notify) => void;
}
