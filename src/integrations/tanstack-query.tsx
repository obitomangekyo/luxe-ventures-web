import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

type QueryContext = {
  queryClient: QueryClient;
};

let cachedContext: QueryContext | null = null;

export function getContext(): QueryContext {
  if (cachedContext) {
    return cachedContext;
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
    },
  });

  cachedContext = {
    queryClient,
  };

  return cachedContext;
}

export function Provider({
  children,
  queryClient,
}: PropsWithChildren & { queryClient: QueryClient }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
