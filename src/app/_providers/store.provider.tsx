"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";
import { DashboardState } from "@/store/store.interface";
import { createDashboardStore } from "@/store/dashboardStore";

export const DashboardContext = createContext<StoreApi<DashboardState> | null>(
  null,
);

export interface ProviderProps {
  children: ReactNode;
}

export const DashboardStoreProvider = ({ children }: ProviderProps) => {
  const storeRef = useRef<StoreApi<DashboardState>>();

  if (!storeRef.current) {
    storeRef.current = createDashboardStore();
  }

  return (
    <DashboardContext.Provider value={storeRef.current}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = <T,>(selector: (store: DashboardState) => T): T => {
  const dashboardStoreContext = useContext(DashboardContext);

  if (!dashboardStoreContext) {
    throw new Error(`useDashboard must be use within CounterStoreProvider`);
  }

  return useStore(dashboardStoreContext, selector);
};
