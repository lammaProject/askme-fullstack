"use client";

import React, { useState } from "react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DashboardStoreProvider } from "@/app/_providers/store.provider";
import Notification from "@/components/Notification";
import handleError from "@/utils/handleError";
import { Notify } from "@/store/store.interface";

export function Providers(props: { children: React.ReactNode }) {
  const [notifyError, setNotifyError] = useState<Notify>({
    open: false,
    message: "",
    type: "alert-info",
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
    queryCache: new QueryCache({
      onError: (error) => handleError(error, setNotifyError),
    }),
    mutationCache: new MutationCache({
      onError: (error) => handleError(error, setNotifyError),
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <DashboardStoreProvider>
        {props.children}
        <Notification notify={notifyError} />
      </DashboardStoreProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
