import { create } from "zustand";
import { DashboardState, SocketState } from "@/store/store.interface";

export const useSocket = create<SocketState>((set) => ({
  disconnect: false,
  setDisconnect: (value) =>
    set(() => ({
      disconnect: value,
    })),
}));

export const useDashboard = create<DashboardState>((set) => ({
  isOnlineInChat: {
    username: "",
    usernameSend: "",
    isOnline: false,
  },
  openChat: false,
  setIsOnlineInChat: (value) =>
    set(() => ({
      isOnlineInChat: value,
    })),
  setOpenChat: (value) =>
    set(() => ({
      openChat: value,
    })),
}));
