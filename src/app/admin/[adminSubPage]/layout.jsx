"use client";
import React from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition, Menu } from "@headlessui/react";
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
import toast from "react-hot-toast";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import useSWR from "swr";
import { classNames } from "@/utils/classNames";
// import PostCreateModal from "./Modal/PostCreateModal";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
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

            {/* <div className="my-4 flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  <input
                    id="search-field"
                    className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 sm:text-sm dark:text-white"
                    placeholder="Search..."
                    type="search"
                    name="search"
                  />
                </div>
              </form>
            </div> */}
          </div>

          <div className="px-9">{children}</div>
        </div>
      </div>
    </div>
  );
}