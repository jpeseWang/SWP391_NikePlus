"use client";
import React from "react";
import AuthProvider from "../context/Provider/AuthProvider";
import { Toaster } from "react-hot-toast";
import { CartContextProvider } from "@/context/Provider/CartContext";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }) {
  return (
    <SessionProvider session={children}>
      <CartContextProvider>
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </CartContextProvider>
    </SessionProvider>
  );
}
