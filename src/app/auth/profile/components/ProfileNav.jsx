"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function ProfileNav() {
  const router = useRouter();
  return (
    <div>
      {" "}
      <nav className="mb-8 flex justify-center space-x-5">
        <a href="/auth/profile" className="text-gray-800 hover:text-black">
          Profile
        </a>
        <button
          onClick={() => router.push("/auth/profile/inbox")}
          className="text-gray-800 hover:text-black"
        >
          Inbox
        </button>
        <a href="/order/history" className="text-gray-800 hover:text-black">
          Order
        </a>
        <button
          onClick={() => router.push("/order/history")}
          className="text-gray-800 hover:text-black"
        >
          Settings
        </button>
      </nav>
    </div>
  );
}
