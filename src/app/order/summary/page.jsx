/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { CartContext } from "@/context/Provider/CartContext";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import getData from "@/utils/getData";
import CommonUtil from "@/common/commonUtils";

export default function OrderSummary() {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [products, setProducts] = useState([]);
  const { cartProducts } = useContext(CartContext);
  const router = useRouter();


  useEffect(() => {
    const lp = CommonUtil.getStorageValue("cartProduct")
    if (lp) {
      setProducts(lp);
    }
  }, []);


  // Calculate totalPrice using products state
  const totalPrice = products.reduce((total, product) => {
    return total + parseInt(product.price) * product.quantity;
  }, 0);

  const shippingFee = 125;
  const taxes = (totalPrice * 0.1).toFixed(0);
  const finalTotal = (parseFloat(totalPrice) + parseFloat(taxes) + shippingFee).toFixed(0);

  const handleClearLs = () => {
    if (ls) {
      ls.removeItem("cart");
      ls.removeItem("deliveryFee");
      ls.removeItem("cartProduct");
      ls.removeItem("totalPrice");
    }
  }


  return (
    <>
      <main className="relative lg:min-h-full">
        <div className="h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
          <img
            src="https://images.unsplash.com/photo-1554350747-ec45fd24f51b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
            alt="TODO"
            className="h-full w-full object-cover object-center mt-6"
          />
        </div>

        <div>
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
            <div className="lg:col-start-2">
              <h1 className="text-sm font-medium text-indigo-600">
                Payment successful
              </h1>
              <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Thanks for ordering
              </p>
              <p className="mt-2 text-base text-gray-500">
                We appreciate your order, we’re currently processing it. So hang
                tight and we’ll send you confirmation very soon!
              </p>

              <dl className="mt-16 text-sm font-medium">
                <dt className="text-gray-900">Tracking number</dt>
                <dd className="mt-2 text-indigo-600">51547878755545848512</dd>
              </dl>

              <ul
                role="list"
                className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
              >
                {products.map((product) => (
                  <li key={product.id} className="flex space-x-6 py-6">
                    <img
                      src={product?.specs[0]?.imgList[0]}
                      alt={product.imageAlt}
                      className="h-24 w-24 flex-none rounded-md bg-gray-100 object-cover object-center"
                    />
                    <div className="flex-auto space-y-1">
                      <h3 className="text-gray-900">
                        <a href={product.href}>{product.name}</a>
                      </h3>
                      <p>{product.type}</p>
                      <div className="w-fit rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm px-2">
                        x{product.quantity}
                      </div>
                    </div>
                    <p className="flex-none font-medium text-gray-900">
                      {CommonUtil.parsePrice(product.price * product.quantity)}
                    </p>
                  </li>
                ))}
              </ul>

              <dl className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="text-gray-900">{CommonUtil.parsePrice(totalPrice)}</dd>
                </div>

                <div className="flex justify-between">
                  <dt>Shipping</dt>
                  <dd className="text-gray-900">{CommonUtil.parsePrice(shippingFee)}</dd>
                </div>

                <div className="flex justify-between">
                  <dt>Taxes</dt>
                  <dd className="text-gray-900">{CommonUtil.parsePrice(taxes)}</dd>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                  <dt className="text-base">Total</dt>
                  <dd className="text-base">
                    {CommonUtil.parsePrice(finalTotal)}
                  </dd>
                </div>
              </dl>

              <dl className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
                <div>
                  <dt className="font-medium text-gray-900">
                    Shipping Address
                  </dt>
                  <dd className="mt-2">
                    <address className="not-italic">
                      <span className="block">Kristin Watson</span>
                      <span className="block">7363 Cynthia Pass</span>
                      <span className="block">Toronto, ON N3Y 4H8</span>
                    </address>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">
                    Payment Information
                  </dt>
                  <dd className="mt-2 space-y-2 sm:flex sm:space-x-4 sm:space-y-0">
                    <div className="flex-none">
                      <svg
                        aria-hidden="true"
                        width={36}
                        height={24}
                        viewBox="0 0 36 24"
                        className="h-6 w-auto"
                      >
                        <rect width={36} height={24} rx={4} fill="#224DBA" />
                        <path
                          d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                          fill="#fff"
                        />
                      </svg>
                      <p className="sr-only">Visa</p>
                    </div>
                    <div className="flex-auto">
                      <p className="text-gray-900">Ending with 4242</p>
                      <p>Expires 12 / 21</p>
                    </div>
                  </dd>
                </div>
              </dl>

              <div className="mt-16 border-t border-gray-200 py-6 text-right">
                <button
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => {
                    handleClearLs()
                    router.push("/marketplace")
                  }
                  }
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
