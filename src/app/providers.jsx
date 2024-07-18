"use client";
import React from "react";
import { Toaster } from "react-hot-toast";
import { CartContextProvider } from "@/context/Provider/CartContext";
import { SessionProvider } from "next-auth/react";

export function Providers({ children, session }) {
  return (
    <SessionProvider session={session}>
      <CartContextProvider>
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </CartContextProvider>
    </SessionProvider>
  );
}
