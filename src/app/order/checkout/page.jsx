/* eslint-disable @next/next/no-sync-scripts */
"use client";
import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { RadioGroup } from "@headlessui/react";
import CommonUtil from "@/common/commonUtils";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { classNames } from "@/utils/classNames";
import { CartContext } from "@/context/Provider/CartContext";
import getData from "@/utils/getData";
import emailjs from "@emailjs/browser";

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

export default function Example() {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const totalPrice = parseInt(ls?.getItem("totalPrice") || "0");
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod");

  const { cartProducts, removeProduct, addUserInfo } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [localProducts, setLocalProducts] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const router = useRouter();
  const form = useRef();

  useEffect(() => {
    const lp = JSON.parse(localStorage.getItem("cart"));
    if (lp) {
      setLocalProducts(lp);
    }
  }, []);
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productData = await Promise.all(
          cartProducts.map((productId) => getData(productId.id))
        );

        const updatedProducts = productData.map((product) => {
          const localProduct = localProducts.find(
            (lp) => lp.id === product._id
          );
          return {
            ...product,
            quantity: localProduct.quantity,
          };
        });

        setProducts(updatedProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductData();
  }, [cartProducts, localProducts]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const deliveryFee = selectedDeliveryMethod.price;
    const email = event.target[0].value;
    const firstName = event.target[1].value;
    const lastName = event.target[2].value;
    const address = event.target[4].value;
    const phone = event.target[10].value;
    const payment = event.target[6].value;
    const fullName = `${firstName} ${lastName}`;

    await addUserInfo(email, fullName, address, phone, payment);
    setUserInfo({
      email: email,
      name: fullName,
      address: address,
      phone: phone,
      payment: payment,
    });
    ls.setItem("totalPrice", totalPrice);
    ls.setItem("finalPrice", finalPrice);
    ls.setItem("deliveryFee", deliveryFee);

    emailjs
      .sendForm(
        "service_p7v3jef",
        "template_7qldsv1",
        form.current,
        "EgKI2lPX0TVNbzTbs"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    if (selectedPaymentMethod.id === "paypal") {
      router.push("/payment");
    } else {
      router.push("/order/summary");
    }
  };
  const subTotal = totalPrice;
  const deliveryFee = selectedDeliveryMethod.price;
  const taxes = (totalPrice * 0.1).toFixed(2);
  const finalPrice = (
    totalPrice +
    selectedDeliveryMethod.price +
    totalPrice * 0.1
  ).toFixed(2);

  console.log(selectedPaymentMethod.id);
  return (
    <div className="bg-gray-50">
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        {" "}
        <button
          class="text-base font-semibold text-indigo-600 hover:text-indigo-500 pb-6"
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
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-2"
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
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="first-name"
                        name="firstName"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-2"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Company
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="company"
                        id="company"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-2"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="address"
                        id="address"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-2"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="apartment"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Apartment, suite, etc.
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="apartment"
                        id="apartment"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Country
                    </label>
                    <div className="mt-1">
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-2"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                        <option>Viet Nam</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State / Province
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="region"
                        id="region"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Postal code
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-2"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        autoComplete="tel"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Product price */}
              <input className="hidden" name="subTotal" value={subTotal} />
              <input
                className="hidden"
                name="deliveryFee"
                value={deliveryFee}
              />
              <input className="hidden" name="taxes" value={taxes} />
              <input className="hidden" name="finalPrice" value={finalPrice} />
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
                            "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
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
                                "pointer-events-none absolute -inset-px rounded-lg"
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
                        defaultValue={selectedPaymentMethod}
                        onClick={() => {
                          setSelectedPaymentMethod(paymentMethod);
                        }}
                      >
                        <input
                          id={paymentMethod.id}
                          name="payment-type"
                          type="radio"
                          defaultValue={selectedPaymentMethod}
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

                          <div className="ml-4 flow-root flex-shrink-0">
                            <button
                              type="button"
                              className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                            >
                              <span className="sr-only">Remove</span>
                              <TrashIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                                onClick={() => removeProduct(product._id)}
                              />
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-1 items-end justify-between pt-2">
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            {CommonUtil.parsePrice(totalPrice)}
                          </p>

                          <div className="ml-4">
                            <label htmlFor="quantity" className="sr-only">
                              Quantity
                            </label>
                            <div
                              id="quantity"
                              name="quantity"
                              className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm px-2"
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
                       {CommonUtil.parsePrice((totalPrice + totalPrice * 0.1 + 125).toFixed(0))}
                    </dd>
                  </div>
                </dl>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <button
                    type="submit"
                    className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
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