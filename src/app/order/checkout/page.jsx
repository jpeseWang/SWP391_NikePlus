/* eslint-disable @next/next/no-sync-scripts */
"use client";
import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { RadioGroup } from "@headlessui/react";
import CommonUtil from "@/common/commonUtils";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/utils/classNames";
import { CartContext } from "@/context/Provider/CartContext";
import { useSession } from "next-auth/react";
import { CreateOrder } from "@/services/orderService";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const deliveryMethods = [
  {
    id: 1,
    title: "Standard",
    turnaround: "4–10 business days",
    price: 5,
  },
  { id: 2, title: "Express", turnaround: "2–5 business days", price: 16 },
];

const paymentMethods = [
  { id: "cod", title: "Cash on delivery (COD)" },
  { id: "paypal", title: "Credit Card/ Paypal" },
];

export default function CheckOutPage() {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const totalPrice = parseInt(ls?.getItem("totalPrice") || "0");
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0],
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod");

  const { removeProduct, addUserInfo } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({
    userInfo: {},
    orderInfo: {},
    products: [],
  });

  const session = useSession();
  const router = useRouter();
  const form = useRef();

  useEffect(() => {
    const lp = CommonUtil.getStorageValue("cartProduct");
    if (lp) {
      setProducts(lp);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target[0].value;
    const firstName = event.target[1].value;
    const lastName = event.target[2].value;
    const company = event.target[3].value;
    const address = event.target[4].value;
    const city = event.target[6].value;
    const country = event.target[7].value;
    const state = event.target[8].value;
    const postalCode = event.target[9].value;
    const phoneNumber = event.target[10].value;
    const fullName = `${firstName} ${lastName}`;

    const order = {
      userInfo: {
        userId: session?.data?.id,
        email,
        firstName,
        lastName,
        fullName,
        company,
        address,
        city,
        country,
        state,
        postalCode,
        phoneNumber,
      },
      orderInfo: {
        deliveryMethod: selectedDeliveryMethod.title,
        deliveryFee: selectedDeliveryMethod.price,
        shippingStatus: "Ready",
        paymentMethod: selectedPaymentMethod.id,
        paymentStatus: "Unpaid",
        totalPrice: parseInt(finalPrice),
      },
      products: products,
    };

    try {
      await setOrder(order);

      await submitOrder(order);
      ls.setItem("totalPrice", totalPrice);
      ls.setItem("finalPrice", finalPrice);
      ls.setItem("deliveryFee", selectedDeliveryMethod.price);
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("An error occurred during form submission: " + error.message);
    }
  };

  const submitOrder = async (orderData) => {
    if (selectedPaymentMethod.id === "paypal") {
      CommonUtil.setStorageValue("orderDataLs", orderData);
      router.push("/order/payment");
    } else {
      try {
        await CreateOrder(orderData);

        emailjs
          .sendForm(
            "service_p7v3jef",
            "template_7qldsv1",
            form.current,
            "EgKI2lPX0TVNbzTbs",
          )
          .then(
            (result) => {
              console.log("EmailJS result:", result.text);
            },
            (error) => {
              console.error("EmailJS error:", error.text);
            },
          );
        router.push("/order/summary");
        toast.success("Order created successfully!");
      } catch (err) {
        console.error("Error creating order:", err);
        toast.error("Something went wrong: " + err.message);
      }
    }
  };

  const subTotal = totalPrice;
  const deliveryFee = selectedDeliveryMethod.price;
  const taxes = (totalPrice * 0.1).toFixed(0);
  const finalPrice = (totalPrice + 125 + totalPrice * 0.1).toFixed(0);

  return (
    <div className="bg-gray-50">
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        {" "}
        <button
          class="pb-6 text-base font-semibold text-indigo-600 hover:text-indigo-500"
          onClick={() => {
            router.push("/marketplace/cart");
          }}
        >
          &larr; Back to Cart
        </button>
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h1 className="sr-only">Checkout</h1>
          <form
            onSubmit={handleSubmit}
            ref={form}
            className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
          >
            <div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Contact information
                </h2>

                <div className="mt-4">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-gray-300 px-2 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">
                  Shipping information
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
  <div>
    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
      First name
    </label>
    <div className="mt-1">
      <input
        type="text"
        id="first-name"
        name="firstName"
        autoComplete="given-name"
        required
        minLength="2"
        className="block w-full rounded-md border-gray-300 px-2 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  </div>

  <div>
    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
      Last name
    </label>
    <div className="mt-1">
      <input
        type="text"
        id="last-name"
        name="lastName"
        autoComplete="family-name"
        required
        minLength="2"
        className="block w-full rounded-md border-gray-300 px-2 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  </div>

  <div className="sm:col-span-2">
    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
      Address
    </label>
    <div className="mt-1">
      <input
        type="text"
        id="address"
        name="address"
        autoComplete="street-address"
        required
        className="block w-full rounded-md border-gray-300 px-2 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  </div>

  <div className="sm:col-span-2">
    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
      City
    </label>
    <div className="mt-1">
      <input
        type="text"
        id="city"
        name="city"
        autoComplete="address-level2"
        required
        className="block w-full rounded-md border-gray-300 px-2 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  </div>

  <div>
    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
      Postal code
    </label>
    <div className="mt-1">
      <input
        type="text"
        id="postal-code"
        name="postalCode"
        autoComplete="postal-code"
        required
        pattern="\d{5}(-\d{4})?"
        className="block w-full rounded-md border-gray-300 px-2 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  </div>

  <div className="sm:col-span-2">
    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
      Phone
    </label>
    <div className="mt-1">
      <input
        type="tel"
        id="phone"
        name="phone"
        autoComplete="tel"
        required
        pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
        
        className="block w-full rounded-md border-gray-300 px-2 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  </div>
</div>

              </div>
              {/* Product price */}
              <input
                className="hidden"
                name="subTotal"
                value={CommonUtil.parsePrice(totalPrice)}
              />
              <input
                className="hidden"
                name="deliveryFee"
                value={CommonUtil.parsePrice(125)}
              />
              <input
                className="hidden"
                name="taxes"
                value={CommonUtil.parsePrice((totalPrice * 0.1).toFixed(0))}
              />
              <input
                className="hidden"
                name="finalPrice"
                value={CommonUtil.parsePrice(parseInt(finalPrice).toFixed(0))}
              />
              <div className="mt-10 border-t border-gray-200 pt-10">
                <RadioGroup
                  value={selectedDeliveryMethod}
                  onChange={setSelectedDeliveryMethod}
                >
                  <RadioGroup.Label className="text-lg font-medium text-gray-900">
                    Delivery method
                  </RadioGroup.Label>

                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    {deliveryMethods.map((deliveryMethod) => (
                      <RadioGroup.Option
                        key={deliveryMethod.id}
                        value={deliveryMethod}
                        className={({ checked, active }) =>
                          classNames(
                            checked ? "border-transparent" : "border-gray-300",
                            active ? "ring-2 ring-indigo-500" : "",
                            "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none",
                          )
                        }
                      >
                        {({ checked, active }) => (
                          <>
                            <span className="flex flex-1">
                              <span className="flex flex-col">
                                <RadioGroup.Label
                                  as="span"
                                  className="block text-sm font-medium text-gray-900"
                                >
                                  {deliveryMethod.title}
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                  as="span"
                                  className="mt-1 flex items-center text-sm text-gray-500"
                                >
                                  {deliveryMethod.turnaround}
                                </RadioGroup.Description>
                                <RadioGroup.Description
                                  as="span"
                                  className="mt-6 text-sm font-medium text-gray-900"
                                >
                                  ${deliveryMethod.price}.00
                                </RadioGroup.Description>
                              </span>
                            </span>
                            {checked ? (
                              <CheckCircleIcon
                                className="h-5 w-5 text-indigo-600"
                                aria-hidden="true"
                              />
                            ) : null}
                            <span
                              className={classNames(
                                active ? "border" : "border-2",
                                checked
                                  ? "border-indigo-500"
                                  : "border-transparent",
                                "pointer-events-none absolute -inset-px rounded-lg",
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              {/* Payment */}
              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">Payment</h2>

                <fieldset className="mt-4">
                  <legend className="sr-only">Payment type</legend>
                  <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                    {paymentMethods.map((paymentMethod) => (
                      <div
                        key={paymentMethod.id}
                        className="flex items-center"
                        onClick={() => setSelectedPaymentMethod(paymentMethod)}
                      >
                        <input
                          id={paymentMethod.id}
                          name="payment-type"
                          type="radio"
                          value={paymentMethod.id}
                          checked={
                            selectedPaymentMethod.id === paymentMethod.id
                          }
                          onChange={() =>
                            setSelectedPaymentMethod(paymentMethod)
                          }
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={paymentMethod.id}
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          {paymentMethod.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>

            {/* Order summary */}
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">
                Order summary
              </h2>

              <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                <h3 className="sr-only">Items in your cart</h3>
                <ul role="list" className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <li key={product.id} className="flex px-4 py-6 sm:px-6">
                      <div className="flex-shrink-0">
                        <img
                          id="imageSrc"
                          src={product?.specs[0]?.imgList[0]}
                          className="w-20 rounded-md"
                        />
                      </div>

                      <div className="ml-6 flex flex-1 flex-col">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm">
                              <a
                                href={product.href}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {product.name}
                              </a>
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.type}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.description.slice(0, 70)}...
                            </p>
                          </div>
                          {/* Product information  */}
                          <input
                            className="hidden"
                            name="productImg"
                            value={product.imageSrc}
                          />
                          <input
                            className="hidden"
                            name="productName"
                            value={product.name}
                          />
                          <input
                            className="hidden"
                            name="productPrice"
                            value={product.price}
                          />
                          <input
                            className="hidden"
                            name="productQuantity"
                            value={product.quantity}
                          />
                        </div>

                        <div className="flex flex-1 items-end justify-between pt-2">
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            {product.size}
                          </p>

                          <div className="ml-4">
                            <label htmlFor="quantity" className="sr-only">
                              Quantity
                            </label>
                            <div
                              id="quantity"
                              name="quantity"
                              className="rounded-md border border-gray-300 px-2 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            >
                              x{product.quantity}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Subtotal</dt>
                    <dd
                      className="text-sm font-medium text-gray-900"
                      name="subTotal"
                    >
                      {CommonUtil.parsePrice(totalPrice)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Shipping</dt>
                    <dd
                      className="text-sm font-medium text-gray-900"
                      name="shippingFee"
                    >
                      {CommonUtil.parsePrice(125)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Taxes</dt>
                    <dd
                      className="text-sm font-medium text-gray-900"
                      name="taxes"
                    >
                      {CommonUtil.parsePrice((totalPrice * 0.1).toFixed(0))}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base font-medium" id="tauto">
                      Total
                    </dt>
                    <dd
                      className="text-base font-medium text-gray-900"
                      name="totalPrice"
                    >
                      {CommonUtil.parsePrice(parseInt(finalPrice).toFixed(0))}
                    </dd>
                  </div>
                </dl>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <button
                    type="submit"
                    className="w-full rounded-md border border-transparent bg-black px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Confirm order
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
