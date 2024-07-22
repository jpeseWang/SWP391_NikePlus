import React from "react";
import { productsSizes } from "@/utils/data/products-sizes";
import { Disclosure, RadioGroup, Tab } from "@headlessui/react";

export default function ProductSize(productCategory) {
  switch (productCategory) {
    case "Shoes":
      return (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-3">
          {sizeVariants.map((size) => (
            <RadioGroup.Option
              key={size}
              value={size}
              className={({ active, checked }) =>
                classNames(
                  checked
                    ? "border-transparent bg-indigo-600 text-white hover:bg-indigo-700"
                    : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
                  active ? "ring-2 ring-indigo-500 ring-offset-2" : "",
                  "flex cursor-pointer items-center justify-center rounded-md border px-3 py-3 text-sm font-medium uppercase sm:flex-1",
                )
              }
            >
              <RadioGroup.Label as="span">{size}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      );
    case "Clothings":
      return (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-3">
          {sizeVariants.map((size) => (
            <RadioGroup.Option
              key={size}
              value={size}
              className={({ active, checked }) =>
                classNames(
                  checked
                    ? "border-transparent bg-indigo-600 text-white hover:bg-indigo-700"
                    : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
                  active ? "ring-2 ring-indigo-500 ring-offset-2" : "",
                  "flex cursor-pointer items-center justify-center rounded-md border px-3 py-3 text-sm font-medium uppercase sm:flex-1",
                )
              }
            >
              <RadioGroup.Label as="span">{size}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      );
    case "Accessories and Equipment":
      return (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-3">
          {sizeVariants.map((size) => (
            <RadioGroup.Option
              key={size}
              value={size}
              className={({ active, checked }) =>
                classNames(
                  checked
                    ? "border-transparent bg-indigo-600 text-white hover:bg-indigo-700"
                    : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
                  active ? "ring-2 ring-indigo-500 ring-offset-2" : "",
                  "flex cursor-pointer items-center justify-center rounded-md border px-3 py-3 text-sm font-medium uppercase sm:flex-1",
                )
              }
            >
              <RadioGroup.Label as="span">{size}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      );
    default:
      return <>Category not found</>;
  }
}
