"use client";

import React, { createContext, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import AuthProvider from "../context/Provider/AuthProvider";

function usePrevious<T>(value: T) {
  let ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export const AppContext = createContext<{ previousPathname?: string }>({});

export function Providers({ children }: { children: React.ReactNode }) {
  let pathname = usePathname();
  let previousPathname: any = usePrevious(pathname);

  return (
    <AppContext.Provider value={{ previousPathname }}>
      <AuthProvider>{children}</AuthProvider>
    </AppContext.Provider>
  );
}
