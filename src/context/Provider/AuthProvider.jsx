import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

const AuthProvider = ({ children }) => {
  return (
    <>
      <SessionProvider>
        {children}
      </SessionProvider>
    </>
  )


    ;
};

export default AuthProvider;
