"use client";
import React from "react";
import { useState } from "react";
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  XMarkIcon,
  TrashIcon,
  PencilSquareIcon,
  UserIcon,
  ShoppingCartIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/20/solid";
import UnauthorizedPage from "@/pages/Unauthenticated";

import { useSession } from "next-auth/react";

import AdminSideBar from "@/components/AdminSideBar";
const navigation = [
  {
    name: "Dashboard",
    href: "/admin/page?title=Dashboard",
    icon: ChartPieIcon,
    current: false,
  },
  {
    name: "User Management",
    href: "/admin/page?title=User Management",
    icon: UserIcon,
    current: false,
  },
  {
    name: "Product Management",
    href: "/admin/page?title=Product Management&section=ListAllProducts",
    icon: FolderIcon,
    current: true,
  },

  {
    name: "API Configuration",
    href: "/admin/page?title=API Configuration",
    icon: ChartBarSquareIcon,
    current: false,
  },
  {
    name: "Orders",
    href: "/admin/page?title=Orders",
    icon: ShoppingCartIcon,
    current: false,
  },
  {
    name: "Settings",
    href: "/admin/page?title=Settings",
    icon: Cog6ToothIcon,
    current: false,
  },
];

export default function Layout({ children }) {
  const [currentNavItem, setCurrentNavItem] = useState("User");
  const [isActive, setIsActive] = useState(true);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const handleActiveTab = (item) => {
    setCurrentNavItem(item);
    setIsActive(true);
  };
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const session = useSession();

  function closeModal() {
    setIsOpen(false);
  }

  // if (session.status === "unauthenticated") {
  //   router?.push("/auth/login");
  // }
  // if (session.status === "authenticated" && session.data.role === "Admin") {
  return (
    <div>
      {session?.data?.role !== "admin" || session.status !== "authenticated" ? (
        <UnauthorizedPage />
      ) : (
        <div className="mx-auto mt-10 ">
          <AdminSideBar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <div className="xl:pl-72">
            {/* Sticky search header */}
            <div className="sticky top-0 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 px-4 shadow-sm sm:px-6 lg:px-8 dark:bg-gray-900">
              <button
                type="button"
                className="-m-2.5 p-2.5 xl:hidden dark:text-white"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="px-9">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
}
