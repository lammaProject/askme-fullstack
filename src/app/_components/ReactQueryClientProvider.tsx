"use client";
import { ReactElement, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export const ReactQueryClientProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
