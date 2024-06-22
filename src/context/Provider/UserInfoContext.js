"use client";
import CommonUtil from "@/common/commonUtils";
import { createContext, useState, useEffect } from "react";

export const UserInfoContext = createContext({});

export function CartContextProvider({ children }) {
    const ls = typeof window !== "undefined" ? window.localStorage : null;
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        if (userInfo?.length > 0) {
            ls?.setItem("userInfo", JSON.stringify(userInfo));
        }
    }, [userInfo]);

    function addUserInfo(Email, name, address, phone, payment) {
        setUserInfo({
            email: Email,
            name: name,
            address: address,
            phone: phone,
            payment: payment,
        });
    }

    return (
        <UserInfoContext.Provider
            value={{
                addUserInfo,
            }}
        >
            {children}
        </UserInfoContext.Provider>
    );
}
