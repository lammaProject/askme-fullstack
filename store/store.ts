import { create } from "zustand";

export const useSocket = create((set) => ({
  disconnect: false,
  setDisconnect: (value) =>
    set((state) => ({
      disconnect: value,
    })),
}));

export const useDashboard = create((set) => ({
  isOnlineInChat: false,
  openChat: false,
  setIsOnlineInChat: (value) =>
    set((state) => ({
      isOnlineInChat: value,
    })),
  setOpenChat: (value) =>
    set((state) => ({
      openChat: value,
    })),
}));
