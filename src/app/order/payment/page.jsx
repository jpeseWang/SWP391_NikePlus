"use client";
import React, { useEffect, useState } from "react";
import PaypalButton from "./paypal";
import { useRouter } from "next/navigation";
import Link from "next/link";

const VND_TO_USD_RATE = 23;

export default function Page() {
  const [price, setPrice] = useState(10); // Default price in USD
  const router = useRouter();

  useEffect(() => {
    const fetchPriceFromLocalStorage = async () => {
      if (typeof window !== "undefined") {
        const ls = window.localStorage;
        const storedPrice = await ls.getItem("finalPrice");

        if (storedPrice) {
          const priceInUSD = storedPrice / VND_TO_USD_RATE;
          setPrice(priceInUSD.toFixed(1)); // Ensure price is formatted to 2 decimal places
        }
      }
    };

    fetchPriceFromLocalStorage();
  }, []);

  return (
    <div className="bg-white">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-6xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Finish your order <br />
            With Credit Card or Paypal
          </p>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
            With PayPal, you can now shop and pay online much safer, easier and
            faster at all of your favorite stores.
          </p>
          <div className="mt-10 flex items-center justify-center">
            <PaypalButton price={price} />
          </div>

          <Link
            href="/order/summary"
            className="border-t border-gray-200 px-4 py-6 sm:px-6"
          >
            <button
              className="w-1/2 rounded-md border border-transparent bg-indigo-600 px-2 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              // onClick={router.push("/order/summary")}
            >
              Confirm order
            </button>
            <p className="text-slate-600 italic mt-2">
              *Confirm Order after payment is successfully
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
