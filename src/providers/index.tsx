"use client";

import {DevTools} from "jotai-devtools";

type ProvidersType = {
  children: React.ReactNode;
};

export const Providers: React.FC<ProvidersType> = ({children}) => {
  return (
    <>
      <DevTools />
      {children}
    </>
  );
};
