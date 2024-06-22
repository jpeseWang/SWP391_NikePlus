import React from "react";

export default function Sales() {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold">SALES 🔥</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {saleProducts.map(
          (item, index) =>
            item && (
              <div key={index} className="rounded-lg border p-4">
                <a href={`/marketplace/product-overviews/${item._id}`}>
                  <div className="h-80 w-full overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={item.specs[0]?.imgList[0]}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </a>
                <div className="mt-2">
                  <span className="inline-block rounded-full bg-red-600 px-2 py-1 text-sm font-semibold text-white">
                    20% off
                  </span>
                </div>
                <p className="mt-2 text-xl font-medium text-gray-700">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500 line-through">
                  {CommonUtil.parsePrice(item.price / 0.8)}
                </p>
                <p className="text-lg font-bold text-red-500">
                  {CommonUtil.parsePrice(item.price)}
                </p>
              </div>
            ),
        )}
      </div>
    </section>
  );
}
