import { createStore } from "zustand";
import { DashboardState } from "@/store/store.interface";

export const defaultState: Omit<
  DashboardState,
  "setIsOnlineInChat" | "setOpenChat" | "setNotify"
> = {
  isOnlineInChat: {
    username: "",
    usernameSend: "",
    isOnline: false,
  },
  openChat: false,
  notify: { open: false, message: "", type: "alert-info" },
};

export const createDashboardStore = (
  initState: Omit<
    DashboardState,
    "setIsOnlineInChat" | "setOpenChat" | "setNotify"
  > = defaultState,
) =>
  createStore<DashboardState>((set) => ({
    ...initState,
    setIsOnlineInChat: (value) =>
      set(() => ({
        isOnlineInChat: value,
      })),
    setOpenChat: (value) =>
      set(() => ({
        openChat: value,
      })),
    setNotify: ({ message, type }) =>
      set(() => ({
        notify: { open: true, message, type },
      })),
  }));
