"use client";

import {ThemeProvider as NextThemesProvider} from "next-themes";

import {ToastProvider} from "@/components/ui/toast";
import {TooltipProvider} from "@/components/ui/tooltip";
import {DevTools} from "jotai-devtools";
import type {ThemeProviderProps} from "next-themes/dist/types";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
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
          <DevTools />
          <TooltipProvider>{children}</TooltipProvider>
        </ToastProvider>
      </QueryClientProvider>
    </NextThemesProvider>
  );
}
