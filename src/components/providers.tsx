"use client";

import {ThemeProvider as NextThemesProvider} from "next-themes";

import {TooltipProvider} from "@/components/ui/tooltip";
import type {ThemeProviderProps} from "next-themes/dist/types";
import {DevTools} from "jotai-devtools";

export function Provider({children, ...props}: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <DevTools />
      <TooltipProvider>{children}</TooltipProvider>
    </NextThemesProvider>
  );
}
