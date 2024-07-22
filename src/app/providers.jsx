"use client";
import React from "react";
import { Toaster } from "react-hot-toast";
import { CartContextProvider } from "@/context/Provider/CartContext";
import { SessionProvider } from "next-auth/react";
import useInactivityLogout from "@/hooks/useInactivityLogout";

export function Providers({ children }) {
  useInactivityLogout();
  return (
    <SessionProvider session={session}>
      <CartContextProvider>
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </CartContextProvider>
    </SessionProvider>
  );
}
