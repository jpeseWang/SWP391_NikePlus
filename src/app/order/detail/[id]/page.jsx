"use client";
import { Fragment, useState } from "react";
import { GetOrderById } from "@/services/orderService";
import LoadingComponent from "@/app/loading";
import CommonUtil from "@/common/commonUtils";

const footerNavigation = {
  account: [
    { name: "Manage Account", href: "#" },
    { name: "Saved Items", href: "#" },
    { name: "Orders", href: "#" },
    { name: "Redeem Gift card", href: "#" },
  ],
  service: [
    { name: "Shipping & Returns", href: "#" },
    { name: "Warranty", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Find a store", href: "#" },
    { name: "Get in touch", href: "#" },
  ],
  company: [
    { name: "Who we are", href: "#" },
    { name: "Press", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Terms & Conditions", href: "#" },
    { name: "Privacy", href: "#" },
  ],
  connect: [
    { name: "Facebook", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "Pinterest", href: "#" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function OrderOverview({ params }) {
  const { orderData, isLoading, isError } = GetOrderById(params.id);
  return (
    <div className="bg-white">
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Order Details
          </h1>

          <div className="mt-2 border-b border-gray-200 pb-5 text-sm sm:flex sm:justify-between">
            <dl className="flex">
              <dt className="text-gray-500">Order number&nbsp;</dt>
              <dd className="font-medium text-gray-900">{orderData?._id}</dd>
              <dt>
                <span className="sr-only">Date</span>
                <span className="mx-2 text-gray-400" aria-hidden="true">
                  &middot;
                </span>
              </dt>
              <dd className="font-medium text-gray-900">
                <time dateTime="2021-03-22">
                  {CommonUtil.parseTimestamp(orderData.createdAt)}
                </time>
              </dd>
            </dl>
            <div className="mt-4 sm:mt-0">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                View invoice
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="mt-8">
            <h2 id="products-heading" className="sr-only">
              Products purchased
            </h2>

            <div className="space-y-24">
              {orderData?.products?.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-8"
                >
                  <div className="sm:col-span-4 md:col-span-5 md:row-span-2 md:row-end-2">
                    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-50">
                      <img
                        src={product?.specs[0]?.imgList[0]}
                        alt={product.imageAlt}
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      <a href={product.href}>{product.name}</a>
                    </h3>
                    <p className="mt-1 font-medium text-gray-900">
                      {CommonUtil.parsePrice(product.price)}
                    </p>
                    <p className="mt-3 text-gray-500">{product.description}</p>
                  </div>
                  <div className="sm:col-span-12 md:col-span-7">
                    <dl className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                      <div>
                        <dt className="font-medium text-gray-900">
                          Delivery address
                        </dt>
                        <dd className="mt-3 text-gray-500">
                          <span className="block">
                            {orderData?.userInfo?.phoneNumber}
                          </span>
                          <span className="block">
                            {orderData?.userInfo?.country}
                          </span>
                          <span className="block">
                            {orderData?.userInfo?.address}
                          </span>
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">
                          Shipping updates
                        </dt>
                        <dd className="mt-3 space-y-3 text-gray-500">
                          <p>{product?.email}</p>
                          <p>{product?.phone}</p>
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Edit
                          </button>
                        </dd>
                      </div>
                    </dl>
                    <p className="mt-6 font-medium text-gray-900 md:mt-10">
                      {product.status} on{" "}
                      <time dateTime={product.datetime}>{product.date}</time>
                    </p>
                    <div className="mt-6">
                      <div className="overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-indigo-600"
                          style={{
                            width: `calc((${product.step} * 2 + 1) / 8 * 100%)`,
                          }}
                        />
                      </div>
                      <div className="mt-6 hidden grid-cols-4 font-medium text-gray-600 sm:grid">
                        <div className="text-indigo-600">Order placed</div>
                        <div
                          className={classNames(
                            product.step > 0 ? "text-indigo-600" : "",
                            "text-center",
                          )}
                        >
                          Processing
                        </div>
                        <div
                          className={classNames(
                            product.step > 1 ? "text-indigo-600" : "",
                            "text-center",
                          )}
                        >
                          Shipped
                        </div>
                        <div
                          className={classNames(
                            product.step > 2 ? "text-indigo-600" : "",
                            "text-right",
                          )}
                        >
                          Delivered
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Billing */}
          {/* <section aria-labelledby="summary-heading" className="mt-24">
            <h2 id="summary-heading" className="sr-only">
              Billing Summary
            </h2>

            <div className="rounded-lg bg-gray-50 px-6 py-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-0 lg:py-8">
              <dl className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-5 lg:pl-8">
                <div>
                  <dt className="font-medium text-gray-900">Billing address</dt>
                  <dd className="mt-3 text-gray-500">
                    <span className="block">Floyd Miles</span>
                    <span className="block">7363 Cynthia Pass</span>
                    <span className="block">Toronto, ON N3Y 4H8</span>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">
                    Payment information
                  </dt>
                  <dd className="mt-3 flex">
                    <div>
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
                    <div className="ml-4">
                      <p className="text-gray-900">Ending with 4242</p>
                      <p className="text-gray-600">Expires 02 / 24</p>
                    </div>
                  </dd>
                </div>
              </dl>

              <dl className="mt-8 divide-y divide-gray-200 text-sm lg:col-span-7 lg:mt-0 lg:pr-8">
                <div className="flex items-center justify-between pb-4">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd className="font-medium text-gray-900">$72</dd>
                </div>
                <div className="flex items-center justify-between py-4">
                  <dt className="text-gray-600">Shipping</dt>
                  <dd className="font-medium text-gray-900">$5</dd>
                </div>
                <div className="flex items-center justify-between py-4">
                  <dt className="text-gray-600">Tax</dt>
                  <dd className="font-medium text-gray-900">$6.16</dd>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <dt className="font-medium text-gray-900">Order total</dt>
                  <dd className="font-medium text-indigo-600">$83.16</dd>
                </div>
              </dl>
            </div>
          </section> */}
        </main>
      )}

      <footer
        aria-labelledby="footer-heading"
        className="border-t border-gray-200 bg-white"
      >
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 py-20 sm:grid-cols-2 sm:gap-y-0 lg:grid-cols-4">
            <div className="grid grid-cols-1 gap-y-10 lg:col-span-2 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-0">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Account</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {footerNavigation.account.map((item) => (
                    <li key={item.name} className="text-sm">
                      <a
                        href={item.href}
                        className="text-gray-500 hover:text-gray-600"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Service</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {footerNavigation.service.map((item) => (
                    <li key={item.name} className="text-sm">
                      <a
                        href={item.href}
                        className="text-gray-500 hover:text-gray-600"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-10 lg:col-span-2 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-0">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Company</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {footerNavigation.company.map((item) => (
                    <li key={item.name} className="text-sm">
                      <a
                        href={item.href}
                        className="text-gray-500 hover:text-gray-600"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Connect</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {footerNavigation.connect.map((item) => (
                    <li key={item.name} className="text-sm">
                      <a
                        href={item.href}
                        className="text-gray-500 hover:text-gray-600"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 py-10 sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center justify-center text-sm text-gray-500">
              <p>Shipping to Canada ($CAD)</p>
              <p className="ml-3 border-l border-gray-200 pl-3">English</p>
            </div>
            <p className="mt-6 text-center text-sm text-gray-500 sm:mt-0">
              &copy; 2021 Your Company, Inc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
