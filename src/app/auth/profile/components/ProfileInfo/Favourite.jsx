import React from "react";

export default function Favourite() {
  return (
    <section className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Favourites</h2>
        <div className="flex items-center space-x-2">
          <a
            href="#"
            className="mr-2 text-xl font-semibold text-gray-800 hover:text-black"
          >
            View all
          </a>
          <button
            onClick={scrollLeft}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <svg
              className="h-4 w-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
          <button
            onClick={scrollRight}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <svg
              className="h-4 w-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-scroll pb-4"
      >
        {productData?.map((product) => (
          <a
            key={product._id}
            href={`/marketplace/product-overviews/${product._id}`}
            className="group my-4 w-60 flex-none text-sm"
          >
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
              <img
                src={product.specs[0]?.imgList[0]}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <h3 className="mt-4 text-base font-medium text-gray-900">
              {product.name}
            </h3>
            <p className="text-base font-light text-gray-500">
              {product.category}
            </p>
            <p className="text-medium mt-2 text-base font-medium text-gray-900">
              {CommonUtil.parsePrice(product.price)}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
