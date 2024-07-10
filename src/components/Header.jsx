"use client";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  AdjustmentsHorizontalIcon,
  GlobeAltIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { classNames } from "@/utils/classNames";
import { NikePlusLogoLight, NikePlusLogoDark } from "@/assets/svg/NikePlusLogo";
import Banner from "./Banner";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Shop all categories", href: "/marketplace", icon: ShoppingCartIcon },
  { name: "Auction community", href: "/community/post", icon: GlobeAltIcon },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const session = useSession();
  const isAuthenticated = session.status === "authenticated";

  console.log(session);

  return (
    <div className="">
      <div
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <div className="-m-1.5 p-1.5 lg:hidden">
            <Link
              href="/"
              className="text-sm font-semibold leading-6 text-[#FAFAFA]"
            >
              <NikePlusLogoDark />
            </Link>
          </div>
        </div>

        {/* Mobile toggle button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 dark:text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="border-border hidden items-center rounded-2xl border border-[#2b2b2b] bg-[#121212] bg-opacity-70 p-3 py-1.5 backdrop-blur-xl backdrop-filter lg:flex lg:gap-x-6">
          <Link
            href="/"
            className="text-sm font-semibold leading-6 text-[#FAFAFA]"
          >
            <NikePlusLogoLight />
          </Link>

          <Link
            href="#"
            className="text-sm font-semibold leading-6 text-[#FAFAFA]"
          >
            SNKRS
          </Link>

          <Link
            href="#"
            className="text-sm font-semibold leading-6 text-[#FAFAFA]"
          >
            About us
          </Link>

          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-[#FAFAFA]">
              Marketplace
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-auto mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100 dark:text-black"
                    >
                      <item.icon
                        className="h-5 w-5 flex-none text-gray-400"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          {isAuthenticated && (
            <Popover className="relative">
              <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-[#FAFAFA]">
                Profile
                <ChevronDownIcon
                  className="h-5 w-5 flex-none text-gray-400"
                  aria-hidden="true"
                />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute -left-8 top-full isolate z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="z-30 grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                    <Link
                      href="/auth/profile"
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100 dark:text-black"
                    >
                      <UserIcon
                        className="h-5 w-5 flex-none text-gray-400"
                        aria-hidden="true"
                      />
                      Profile
                    </Link>

                    {session?.data?.role === "admin" && (
                      <Link
                        href="/admin/page?title=Dashboard"
                        className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100 dark:text-black"
                      >
                        <AdjustmentsHorizontalIcon
                          className="h-5 w-5 flex-none text-gray-400"
                          aria-hidden="true"
                        />
                        Admin
                      </Link>
                    )}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          )}

          {session.status === "authenticated" ? (
            <button
              onClick={signOut}
              className="rounded-lg bg-textDark px-2.5 py-1.5 text-sm font-semibold leading-6 text-[#18181B] "
            >
              Sign out
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="rounded-lg bg-textDark px-2.5 py-1.5 text-sm font-semibold leading-6 text-[#18181B] "
            >
              Sign in
            </Link>
          )}
        </Popover.Group>
        {/*end 2 icon*/}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end"></div>
      </div>
      <Banner sessionData={session} />

      {/* Mobile nav */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[#1A222C] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <NikePlusLogoDark></NikePlusLogoDark>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-[#FAFAFA] hover:bg-gray-50">
                        Product
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none",
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-[#878787] hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Link
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#878787] hover:bg-gray-50"
                >
                  SNKRS
                </Link>
                <Link
                  href="/marketplace"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#878787] hover:bg-gray-50"
                >
                  Marketplace
                </Link>
                {session?.data?.role === "admin" && (
                  <Link
                    href="/admin/page?title=Dashboard"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#878787] hover:bg-gray-50"
                  >
                    Admin
                  </Link>
                )}
              </div>
              <div className="py-6">
                {session.status === "authenticated" ? (
                  <button
                    onClick={signOut}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-[#878787] hover:bg-gray-50"
                  >
                    Sign out
                  </button>
                ) : (
                  <a
                    href="/auth/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-[#878787] hover:bg-gray-50"
                  >
                    Sign in
                  </a>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}
