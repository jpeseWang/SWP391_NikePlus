"use client";

import { GetAllProduct } from "@/services/productService";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CommonUtil from "@/common/commonUtils";
import LoadingComponent from "@/app/loading";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import ProfileNav from "./components/ProfileNav";
import ProfileInfo from "./components/ProfileInfo/index";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const { productData, isLoading, isError } = GetAllProduct();
  const router = useRouter();
  const scrollContainerRef = useRef(null);

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

  if (
    status === "loading" ||
    isLoading ||
    saleLoading1 ||
    saleLoading2 ||
    saleLoading3
  ) {
    return <LoadingComponent />;
  }

  if (!session) {
    return <p>You need to be authenticated to view this page.</p>;
  }

  if (isError) {
    return <p>Error loading products.</p>;
  }

  if (saleError1 || saleError2 || saleError3) {
    console.error(
      "Error fetching sale products:",
      saleError1,
      saleError2,
      saleError3,
    );
    return <p>Error loading sale products.</p>;
  }

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="p-9">
      <ProfileNav />
      <div className="mb-8 flex items-center">
        <div className="w-19 h-19 flex items-center justify-center rounded-full bg-gray-300">
          <svg
            className="h-12 w-12 text-gray-500"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
          </svg>
        </div>
        <div className="ml-6">
          <h1 className="font-serif text-2xl font-semibold">
            {session.user.name}
          </h1>
          <p className="text-xl text-gray-600">Nike Member Since June 2024</p>
        </div>
      </div>

      {/* Profile info */}
      <ProfileInfo />
      {/* Favourites section */}
      {/* Sales section */}
    </div>
  );
}
