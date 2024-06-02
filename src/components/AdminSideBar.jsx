// components/Sidebar.jsx
"use client";
import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  XMarkIcon,
  ShoppingCartIcon,
  ChartPieIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { classNames } from "@/utils/classNames";

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

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const [currentNavItem, setCurrentNavItem] = useState("User");
  const [isActive, setIsActive] = useState(true);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const handleActiveTab = (item) => {
    setCurrentNavItem(item);
    setIsActive(true);
  };

  return (
    <>
      <Transition.Root show={sidebarOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative xl:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={React.Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-white dark:bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={React.Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={React.Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
                  <div className="flex h-16 shrink-0 items-center"></div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item, index) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className={classNames(
                                  item.name === currentNavItem && isActive
                                    ? "bg-gray-800 text-white"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white",
                                  "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                                )}
                                onClick={() => {
                                  handleActiveTab(item.name);
                                  setActiveStepIndex(index);
                                }}
                              >
                                <item.icon
                                  className="h-6 w-6 shrink-0"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden bg-[#15161B] xl:fixed xl:inset-y-0 xl:flex xl:w-72 xl:flex-col">
        <div className="flex h-10  grow flex-col gap-y-5 overflow-y-auto px-6 ring-1 ring-white/5 dark:bg-black/10">
          <div className="flex h-16 shrink-0 items-center"></div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item, index) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={classNames(
                          item.name === currentNavItem && isActive
                            ? "bg-gray-800 text-[#3C4FDE]"
                            : "text-textDark hover:bg-gray-800 hover:text-white",
                          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                        )}
                        onClick={() => {
                          handleActiveTab(item.name);
                          setActiveStepIndex(index);
                        }}
                      >
                        <item.icon
                          className="h-6 w-6 shrink-0"
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
