"use client";

import {ToastProvider} from "@/components/ui/toast";
import {TooltipProvider} from "@/components/ui/tooltip";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import type {ThemeProviderProps} from "next-themes/dist/types";
import React from "react";

export function Provider({children, ...props}: ThemeProviderProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true,
          },
        },
      })
  );
  return (
    <NextThemesProvider {...props}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <TooltipProvider>{children}</TooltipProvider>
        </ToastProvider>
      </QueryClientProvider>
    </NextThemesProvider>
  );
}
