"use client";
import Link from "next/link";
import useSWR from "swr";
import { useState, useEffect, useContext } from "react";
import { Disclosure, RadioGroup, Tab } from "@headlessui/react";
import { HeartIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingComponent from "@/app/loading";
import CommonUtil from "@/common/commonUtils";
import { CartContext } from "@/context/Provider/CartContext";
import { classNames } from "@/utils/classNames";
import { GetProductById } from "@/services/productService";

const colorVariants = ["Black", "White", "Blue"];
const sizeVariants = ["37", "38", "39", "40", "41", "42", "43", "44", "45"];
const relatedProducts = [
  {
    id: 1,
    name: "Air Jordan 1 Mid SE",
    color: "Men's Shoes",
    href: "#",
    imageSrc:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/22b7ce96-431b-432a-bd1a-ed32894a4430/air-jordan-1-mid-se-mens-shoes-vw6Hxn.png",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "$135",
  },
  // More products...
];

export default function ProductOverview({ params }) {
  const { addProduct } = useContext(CartContext);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const searchParams = useSearchParams();
  // const selectedColor = searchParams.get("color");
  // const selectedSize = searchParams.get("size");
  const router = useRouter();

  const { productData, isLoading, isError } = GetProductById(params.id);

  const addFeaturedToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to the cart.");
      return;
    }
    console.log("Adding to cart:", productData, selectedSize);
    addProduct(productData._id, productData.price, selectedSize);
  };

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <button
          className="my-6 ml-2 text-base font-semibold text-indigo-600 hover:text-indigo-500"
          onClick={() => {
            router.push("/marketplace");
          }}
        >
          &larr; Back to Marketplace
        </button>
        {isLoading && <LoadingComponent />}

        <div className="mx-auto max-w-2xl lg:max-w-none">
          {!isLoading && (
            <>
              <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                <Tab.Group as="div" className="flex flex-col-reverse">
                  <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                    <Tab.List className="grid grid-cols-4 gap-6">
                      {productData?.specs[selectedColor].imgList?.map(
                        (image) => (
                          <Tab
                            key={image.id}
                            className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                          >
                            {({ selected }) => (
                              <>
                                <span className="sr-only">{image}</span>
                                <span className="absolute inset-0 overflow-hidden rounded-md">
                                  {/* Main Images */}
                                  <img
                                    src={image}
                                    alt=""
                                    className="h-full w-full object-cover object-center"
                                  />
                                </span>
                                <span
                                  className={classNames(
                                    selected
                                      ? "ring-indigo-500"
                                      : "ring-transparent",
                                    "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2",
                                  )}
                                  aria-hidden="true"
                                />
                              </>
                            )}
                          </Tab>
                        ),
                      )}
                    </Tab.List>
                  </div>

                  <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                    {/* 
                    selec img */}
                    {productData?.specs[selectedColor].imgList?.map((image) => (
                      <Tab.Panel key={image.id}>
                        <img
                          src={image}
                          alt={image.alt}
                          className="h-full w-full object-cover object-center sm:rounded-lg"
                        />
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                {/* Product info */}
                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                  <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                    {productData.name}
                  </h1>

                  <div className="mt-3">
                    <h2 className="sr-only">Product information</h2>
                    <p className="text-2xl tracking-tight text-gray-900">
                      {CommonUtil.parsePrice(productData.price)}
                    </p>
                  </div>

                  {/* Reviews */}
                  <div className="mt-3">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              productData.rating > rating
                                ? "text-black"
                                : "text-gray-300",
                              "h-5 w-5 flex-shrink-0",
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">
                        {productData.rating} out of 5 stars
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="sr-only">Description</h3>

                    <div
                      className="space-y-6 text-base text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html: productData.description,
                      }}
                    />
                  </div>

                  <div className="mt-6">
                    {/* Colors */}
                    <div className="mt-4">
                      <h3 className="text-sm text-gray-600">Colors</h3>

                      <Tab.Group as="div" className="flex flex-col-reverse">
                        <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                          <Tab.List className="grid grid-cols-4 gap-6">
                            {productData?.specs?.map((image, index) => (
                              <Tab
                                key={image.id}
                                className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                              >
                                {({ selected }) => (
                                  <>
                                    <span className="absolute inset-0 overflow-hidden rounded-md">
                                      {/* First img in color imgList */}
                                      <img
                                        src={image.imgList[0]}
                                        alt=""
                                        className="h-full w-full object-cover object-center"
                                        onClick={() => {
                                          setSelectedColor(index);
                                        }}
                                      />
                                    </span>
                                    <span
                                      className={classNames(
                                        selected
                                          ? "ring-indigo-500"
                                          : "ring-transparent",
                                        "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2",
                                      )}
                                      aria-hidden="true"
                                    />
                                  </>
                                )}
                              </Tab>
                            ))}
                          </Tab.List>
                        </div>
                      </Tab.Group>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-sm text-gray-600">Select Size</h3>

                      <RadioGroup
                        value={selectedSize}
                        onChange={setSelectedSize}
                        className="mt-2"
                      >
                        <RadioGroup.Label className="sr-only">
                          Choose a size
                        </RadioGroup.Label>
                        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-3">
                          {sizeVariants.map((size) => (
                            <RadioGroup.Option
                              key={size}
                              value={size}
                              className={({ active, checked }) =>
                                classNames(
                                  active
                                    ? "ring-2 ring-indigo-500"
                                    : "",
                                  checked
                                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                                    : "bg-white text-gray-900 hover:bg-gray-50",
                                  "cursor-pointer rounded-md py-3 px-3 text-sm font-medium uppercase sm:flex-1",
                                )
                              }
                            >
                              <RadioGroup.Label as="p">
                                {size}
                              </RadioGroup.Label>
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="mt-10 flex flex-col items-center justify-center">
                    <button
                      className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-black py-3 px-8 text-base font-medium text-white hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={addFeaturedToCart}
                    >
                      Add to Cart
                    </button>

                    <button
                      type="button"
                      className="flex w-full items-center justify-center rounded-md border border-transparent py-3 px-8 text-base font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <HeartIcon
                        className="mr-2 h-6 w-6 flex-shrink-0 text-black"
                        aria-hidden="true"
                      />
                      Add to Favorite
                    </button>
                  </div>

                  <section aria-labelledby="details-heading" className="mt-12">
                    <h2 id="details-heading" className="sr-only">
                      Additional details
                    </h2>

                    <Disclosure as="div" defaultOpen>
                      {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="flex w-full items-center justify-between py-6 text-sm font-medium text-left text-gray-400 border-b border-gray-200">
                              <span>Features</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="block w-6 h-6"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="block w-6 h-6"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              <p className="text-sm text-gray-600">
                                {productData.features}
                              </p>
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </section>
                </div>
              </div>

              <section aria-labelledby="related-heading" className="mt-16">
                <h2
                  id="related-heading"
                  className="text-lg font-semibold text-gray-900"
                >
                  Customers also bought
                </h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                  {relatedProducts.map((product) => (
                    <div key={product.id} className="group relative">
                      <div className="w-full min-h-80 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                        <img
                          src={product.imageSrc}
                          alt={product.imageAlt}
                          className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <h3 className="mt-4 text-sm text-gray-700">
                        <Link href={product.href}>
                          <span className="absolute inset-0" />
                          {product.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.color}
                      </p>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {product.price}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
