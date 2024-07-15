"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const InboxPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) {
    return <p>You need to be authenticated to view this page.</p>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <nav className="mb-8 w-full bg-white shadow">
        <div className="container mx-auto flex items-center justify-between px-4 py-5">
          <span className="px-8 font-semibold text-gray-800">
            {session?.user?.name}
          </span>
          <div className="mr-40 flex flex-1 justify-center">
            <div className="flex space-x-7">
              <a
                href="/auth/profile"
                className="text-gray-800 hover:text-black"
              >
                Profile
              </a>
              <a
                href="/auth/profile/inbox"
                className="text-gray-800 hover:text-black"
              >
                Inbox
              </a>
              <a
                href="/order/history"
                className="text-gray-800 hover:text-black"
              >
                Order
              </a>
              <a
                href="/auth/profile/setting"
                className="text-gray-800 hover:text-black"
              >
                Settings
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <h2 className="font-base mb-2 text-3xl">No Messages</h2>
          <p className="text-xl text-gray-600">
            Messages and notifications from NikePlus will show up here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InboxPage;
