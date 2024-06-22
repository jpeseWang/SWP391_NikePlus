"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const InboxPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (!session) {
    return <p>You need to be authenticated to view this page.</p>;
}

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <nav className="w-full bg-white shadow mb-8">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <span className="text-gray-800 font-semibold px-8">{session.user.name}</span>
          <div className="flex-1 flex justify-center mr-40">
            <div className="flex space-x-7">
              <button onClick={() => router.push("/auth/profile/")} className="text-gray-800 hover:text-black">Profile</button>
              <button onClick={() => router.push("/auth/profile/inbox")} className="text-gray-800 hover:text-black">Inbox</button>
              <button onClick={() => router.push("/auth/profile/orders")} className="text-gray-800 hover:text-black">Orders</button>
              <button onClick={() => router.push("/auth/profile/setting")} className="text-gray-800 hover:text-black">Settings</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <h2 className="text-3xl font-base mb-2">No Messages</h2>
          <p className="text-gray-600 text-xl">Messages and notifications from NikePlus will show up here.</p>
        </div>
      </div>
    </div>
  );
};

export default InboxPage;
