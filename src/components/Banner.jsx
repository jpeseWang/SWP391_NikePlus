import { useContext } from "react";
import { CartContext } from "@/context/Provider/CartContext";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { ShoppingCartIcon, HeartIcon } from "@heroicons/react/24/outline";

export default function Banner({ sessionData }) {
  const { cartProducts } = useContext(CartContext);
  const subtotal = cartProducts.length;
  const isAuthenticated = sessionData.status === "authenticated";
  if (isAuthenticated === "authenticated") {
    console.log(sessionData?.data.user?.name);
  }

  return (
    <div className="relative isolate mt-9 flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      {/* Gradient background */}

      <div
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
        />
      </div>
      <div
        className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
        />
      </div>
      {/* Banner content */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {isAuthenticated ? (
          <p className="text-sm leading-6 text-gray-900">
            Welcome back,{" "}
            <strong className="font-semibold">
              {sessionData?.data.user?.name}!
            </strong>
          </p>
        ) : (
          <>
            <p className="text-sm leading-6 text-gray-900">
              Login to explore{" "}
              <strong className="font-semibold">all of our products!</strong>
            </p>
            <a
              href="#"
              className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              Shop now <span aria-hidden="true">&rarr;</span>
            </a>
          </>
        )}

        {/* wishlist icon*/}
        {isAuthenticated && (
          <div className="flex">
            <Link href="/">
              <div className="relative flex h-1 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-black/[0.05] md:h-12 md:w-12">
                <HeartIcon className="h-6 w-6 text-gray-600" />
                <div className="absolute left-5 top-1 flex h-[14px] min-w-[14px] items-center justify-center rounded-full bg-red-600 px-[2px] text-[10px] text-white md:left-7 md:h-[18px] md:min-w-[18px] md:px-[5px] md:text-[12px]">
                  10
                </div>
              </div>
            </Link>
            {/*cart icon*/}
            <Link href="/order/cart">
              <div className="relative flex h-1 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-black/[0.05] md:h-12 md:w-12">
                <ShoppingCartIcon className="h-6 w-6 text-gray-600" />
                <div className="absolute left-5 top-1 flex h-[14px] min-w-[14px] items-center justify-center rounded-full bg-red-600 px-[2px] text-[10px] text-white md:left-7 md:h-[18px] md:min-w-[18px] md:px-[5px] md:text-[12px]">
                  {subtotal}
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-1 justify-end">
        {/* <button
          type="button"
          className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
        >
          <span className="sr-only">Dismiss</span>
          <XMarkIcon className="h-5 w-5 text-gray-900" aria-hidden="true" />
        </button> */}
      </div>
    </div>
  );
}
