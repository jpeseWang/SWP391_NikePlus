"use client";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Field,
  Label,
  Switch,
  TransitionChild,
} from "@headlessui/react";
import {
  ArrowLeftOnRectangleIcon,
  Bars3BottomLeftIcon,
  BellIcon,
  BriefcaseIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  CogIcon,
  DocumentMagnifyingGlassIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "#", icon: HomeIcon, current: false },
  { name: "Jobs", href: "#", icon: BriefcaseIcon, current: false },
  {
    name: "Applications",
    href: "#",
    icon: DocumentMagnifyingGlassIcon,
    current: false,
  },
  {
    name: "Messages",
    href: "#",
    icon: ChatBubbleOvalLeftEllipsisIcon,
    current: false,
  },
  { name: "Team", href: "#", icon: UsersIcon, current: false },
  { name: "Settings", href: "#", icon: CogIcon, current: true },
];
const secondaryNavigation = [
  { name: "Help", href: "#", icon: QuestionMarkCircleIcon },
  { name: "Logout", href: "#", icon: ArrowLeftOnRectangleIcon },
];

export default function ProfileSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] =
    useState(true);
  const [autoUpdateApplicantDataEnabled, setAutoUpdateApplicantDataEnabled] =
    useState(false);
  return (
    <div>
      {" "}
      <Dialog
        className="relative z-40 lg:hidden"
        open={sidebarOpen}
        onClose={setSidebarOpen}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs flex-1 transform flex-col bg-white pb-4 pt-5 transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute right-0 top-0 -mr-14 p-1 duration-300 ease-in-out data-[closed]:opacity-0">
                <button
                  type="button"
                  className="flex h-12 w-12 items-center justify-center rounded-full focus:bg-gray-600 focus:outline-none"
                  onClick={() => setSidebarOpen(false)}
                >
                  <XMarkIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Close sidebar</span>
                </button>
              </div>
            </TransitionChild>
            <div className="flex flex-shrink-0 items-center px-4">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=purple&shade=600"
                alt="Easywire"
              />
            </div>
            <div className="mt-5 h-0 flex-1 overflow-y-auto">
              <nav className="flex h-full flex-col">
                <div className="space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "border-purple-600 bg-purple-50 text-purple-600"
                          : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        "group flex items-center border-l-4 px-3 py-2 text-base font-medium",
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "text-purple-500"
                            : "text-gray-400 group-hover:text-gray-500",
                          "mr-4 h-6 w-6 flex-shrink-0",
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="mt-auto space-y-1 pt-10">
                  {secondaryNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="group flex items-center border-l-4 border-transparent px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    >
                      <item.icon
                        className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </DialogPanel>
          <div className="w-14 flex-shrink-0" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </Dialog>
      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <nav className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-gray-50 pb-4 pt-5">
          <div className="flex flex-shrink-0 items-center px-4">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=purple&shade=600"
              alt="Easywire"
            />
          </div>
          <div className="mt-5 flex-grow">
            <div className="space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "border-purple-600 bg-purple-50 text-purple-600"
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group flex items-center border-l-4 px-3 py-2 text-sm font-medium",
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? "text-purple-500"
                        : "text-gray-400 group-hover:text-gray-500",
                      "mr-3 h-6 w-6 flex-shrink-0",
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="block w-full flex-shrink-0">
            {secondaryNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group flex items-center border-l-4 border-transparent px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <item.icon
                  className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                {item.name}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
