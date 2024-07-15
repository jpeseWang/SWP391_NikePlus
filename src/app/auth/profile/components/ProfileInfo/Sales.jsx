import React from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { GetAllProduct } from "@/services/productService";
import CommonUtil from "@/common/commonUtils";
import LoadingComponent from "@/app/loading";

export default function Sales() {
  const { productData, isLoading, isError } = GetAllProduct();

  const saleProductIds = [
    "66763367cb1f2afb06b841bc",
    "667633d0cb1f2afb06b841c0",
    "66763431cb1f2afb06b841c3",
  ];

  const {
    data: saleProduct1,
    error: saleError1,
    isLoading: saleLoading1,
  } = useSWR(`/api/product/${saleProductIds[0]}`, fetcher);
  const {
    data: saleProduct2,
    error: saleError2,
    isLoading: saleLoading2,
  } = useSWR(`/api/product/${saleProductIds[1]}`, fetcher);
  const {
    data: saleProduct3,
    error: saleError3,
    isLoading: saleLoading3,
  } = useSWR(`/api/product/${saleProductIds[2]}`, fetcher);

  const saleProducts = [saleProduct1, saleProduct2, saleProduct3];

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
