"use client";
import React from "react";
import AuthProvider from "../context/Provider/AuthProvider";
import { Toaster } from "react-hot-toast";
import { CartContextProvider } from "@/context/Provider/CartContext";

export function Providers({ children }) {

  return (
    <>
      <AuthProvider>
        <CartContextProvider>
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </CartContextProvider>
      </AuthProvider>
    </>
  );
}
