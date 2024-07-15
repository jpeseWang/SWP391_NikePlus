"use client";
import { CheckIcon } from "@heroicons/react/24/outline";
import { GetOrderByUserId } from "@/services/orderService";
import { useSession } from "next-auth/react";
import LoadingComponent from "@/app/loading";
import CommonUtil from "@/common/commonUtils";
import ProfileNav from "@/app/auth/profile/components/ProfileNav";

export default function OrderHistoryPage() {
  const session = useSession();
  const { orderData, isLoading, isError } = GetOrderByUserId(session?.data?.id);
  console.log(orderData);

  return (
    <div className="bg-white">
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div className="mx-auto max-w-4xl py-16 sm:px-6 sm:py-24">
          <ProfileNav />
          <div className="px-4 sm:px-0">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Order history
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Check the status of recent orders, manage returns, and download
              invoices.
            </p>
          </div>

          <div className="mt-16">
            <h2 className="sr-only">Recent orders</h2>

            <div className="space-y-16 sm:space-y-24">
              {orderData
                .slice()
                .reverse()
                .map((order) => (
                  <div key={order.number}>
                    <h3 className="sr-only">
                      Order placed on{" "}
                      <time dateTime={order.datetime}>{order.createdAt}</time>
                    </h3>

                    <div className="bg-gray-50 px-4 py-6 sm:rounded-lg sm:p-6 md:flex md:items-center md:justify-between md:space-x-6 lg:space-x-8">
                      <dl className="flex-auto space-y-4 divide-y divide-gray-200 text-sm text-gray-600 md:grid md:grid-cols-3 md:gap-x-6 md:space-y-0 md:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                        <div className="flex justify-between md:block">
                          <dt className="font-medium text-gray-900">
                            Order number
                          </dt>
                          <dd className="md:mt-1">{order._id.slice(10, -1)}</dd>
                        </div>
                        <div className="flex justify-between pt-4 md:block md:pt-0">
                          <dt className="font-medium text-gray-900">
                            Date placed
                          </dt>
                          <dd className="md:mt-1">
                            <time dateTime={order.datetime}>
                              {CommonUtil.parseTimestamp(order.createdAt)}
                            </time>
                          </dd>
                        </div>
                        <div className="flex justify-between pt-4 font-medium text-gray-900 md:block md:pt-0">
                          <dt>Total amount</dt>
                          <dd className="md:mt-1">
                            {CommonUtil.parsePrice(order.orderInfo.totalPrice)}
                          </dd>
                        </div>
                      </dl>
                      <div className="mt-6 space-y-4 sm:flex sm:space-x-4 sm:space-y-0 md:mt-0">
                        <a
                          href={order.href}
                          className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:w-auto"
                        >
                          View Order
                          <span className="sr-only">{order.number}</span>
                        </a>

                        {order.orderInfo.paymentStatus === "Paid" ? (
                          <div className="flex w-full items-center justify-center rounded-md border border-green-600/20 bg-green-50 px-4 py-2 text-sm font-medium  text-green-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:w-auto">
                            Paid
                            <span className="sr-only">{order.number}</span>
                          </div>
                        ) : (
                          <div className="flex w-full items-center justify-center rounded-md border border-yellow-600/20 bg-yellow-50 px-4 py-2 text-sm font-medium  text-yellow-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:w-auto">
                            Unpaid
                            <span className="sr-only">{order.number}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 flow-root px-4 sm:mt-10 sm:px-0">
                      <div className="-my-6 divide-y divide-gray-200 sm:-my-10">
                        {order.products.map((product) => (
                          <div key={product.id} className="flex py-6 sm:py-10">
                            <div className="min-w-0 flex-1 lg:flex lg:flex-col">
                              <div className="lg:flex-1">
                                <div className="sm:flex">
                                  <div>
                                    <h4 className="font-medium text-gray-900">
                                      {product.name}
                                    </h4>
                                    <p className="mt-2 hidden text-sm text-gray-500 sm:block">
                                      {product.description}
                                    </p>
                                  </div>
                                  <p className="mt-1 font-medium text-gray-900 sm:ml-6 sm:mt-0">
                                    {CommonUtil.parsePrice(product.price)}
                                  </p>
                                </div>
                                <div className="mt-2 flex text-sm font-medium sm:mt-4">
                                  <a
                                    href={`/marketplace/product-overviews/${product._id}`}
                                    className="text-indigo-600 hover:text-indigo-500"
                                  >
                                    View Product
                                  </a>
                                  <div className="ml-4 border-l border-gray-200 pl-4 sm:ml-6 sm:pl-6">
                                    {/* <a
                                      href="#"
                                      className="text-indigo-600 hover:text-indigo-500"
                                    >
                                      Buy Again
                                    </a> */}
                                    <span className="text inline-flex items-center gap-x-1.5 rounded-md bg-yellow-100 px-1.5 py-0.5 font-medium text-yellow-800">
                                      <svg
                                        className="h-1.5 w-1.5 fill-yellow-500"
                                        viewBox="0 0 6 6"
                                        aria-hidden="true"
                                      >
                                        <circle cx={3} cy={3} r={3} />
                                      </svg>
                                      To pack
                                    </span>
                                  </div>
                                </div>
                                <div className="mt-2 flex text-sm font-medium">
                                  <a
                                    href={product.href}
                                    className="text-slate-600 hover:text-indigo-500"
                                  >
                                    Quantity: x{product.quantity}
                                  </a>
                                </div>
                              </div>
                              <div className="mt-6 font-medium">
                                {product.status === "delivered" ? (
                                  <div className="flex space-x-2">
                                    <CheckIcon
                                      className="h-6 w-6 flex-none text-green-500"
                                      aria-hidden="true"
                                    />
                                    <p>
                                      Delivered
                                      <span className="hidden sm:inline">
                                        {" "}
                                        on{" "}
                                        <time dateTime={product.datetime}>
                                          {product.date}
                                        </time>
                                      </span>
                                    </p>
                                  </div>
                                ) : product.status === "out-for-delivery" ? (
                                  <p>Out for delivery</p>
                                ) : product.status === "cancelled" ? (
                                  <p className="text-gray-500">Cancelled</p>
                                ) : null}
                              </div>
                            </div>
                            <div className="ml-4 flex-shrink-0 sm:order-first sm:m-0 sm:mr-6">
                              <img
                                src={product.specs[0]?.imgList[0]}
                                alt={product.imageAlt}
                                className="col-start-2 col-end-3 h-20 w-20 rounded-lg object-cover object-center sm:col-start-1 sm:row-span-2 sm:row-start-1 sm:h-40 sm:w-40 lg:h-52 lg:w-52"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
