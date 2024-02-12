"use client";

import {ThemeProvider as NextThemesProvider} from "next-themes";
import {DevTools} from "jotai-devtools";
import type {ThemeProviderProps} from "next-themes/dist/types";
import {cn} from "@/lib/utils";

export function Provider({children, ...props}: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <DevTools />
      {children}
    </NextThemesProvider>
  );
}

interface CommonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const CommonInput = ({className, value}: CommonInputProps) => {
  return <input className={cn("w-24 align-baseline", className)} value={value} />;
};
