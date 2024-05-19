"use client";
import React from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition, Menu } from "@headlessui/react";
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
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
    href: "/admin/page?title=Product Management",
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

export default function AdminSideBar({ children }) {
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
  const router = useRouter();
  const searchParams = useSearchParams();
  // const selectedColor = searchParams.get();
  function closeModal() {
    setIsOpen(false);
  }

  // const fetcher = (...args) => fetch(...args).then((res) => res.json());
  // const { data, mutate, error, isLoading } = useSWR(`/api/posts`, fetcher);

  // if (session.status === "unauthenticated") {
  //   router?.push("/auth/login");
  // }
  // if (session.status === "authenticated" && session.data.role === "Admin") {
  return (
    <>
      <div className="mx-auto mt-10  h-screen">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative xl:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
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
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
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
                  {/* Sidebar component, swap this element with another sidebar if you like */}
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
                                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
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

        {/* Static sidebar for desktop */}
        <div className="hidden xl:fixed xl:inset-y-0  xl:flex xl:w-72 xl:flex-col bg-[#15161B] h-100">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto  px-6 ring-1 ring-white/5 dark:bg-black/10">
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
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
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

        <div className="xl:pl-72">
          {/* Sticky search header */}
          <div className="sticky top-0 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 px-4 shadow-sm dark:bg-gray-900 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 dark:text-white xl:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
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
                    className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 focus:ring-0 dark:text-white sm:text-sm"
                    placeholder="Search..."
                    type="search"
                    name="search"
                  />
                </div>
              </form>
            </div> */}
          </div>

          {/* <main className="px-9">{navigation[activeStepIndex].component}</main> */}
          <div className="px-9">{children}</div>
        </div>
        {/* {modalIsOpen && (
            <PostCreateModal
              isOpen={modalIsOpen}
              onClose={closeModal}
              reload={mutate}
            />
          )} */}
      </div>
    </>
  );
}
// }
