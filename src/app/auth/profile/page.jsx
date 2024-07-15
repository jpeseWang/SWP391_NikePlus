"use client";

import { GetAllProduct } from "@/services/productService";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import ProfileNav from "./components/ProfileNav";
import Favourite from "./components/ProfileInfo/Favourite";
import Sales from "./components/ProfileInfo/Sales";
import LoadingComponent from "@/app/loading";
import { GetUserById } from "@/services/userService";

export default function ProfilePage() {
  const { data: session } = useSession();
  const { productData, isError } = GetAllProduct();
  const router = useRouter();

  const userId = session?.id;
  const { userData, isLoading } = GetUserById(userId);

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

  if (!session) {
    return <p>You need to be authenticated to view this page.</p>;
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

  return (
    <div className="p-9">
      <ProfileNav />
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div className="mb-8 flex items-center">
          <div className="w-19 h-19 flex items-center justify-center rounded-full bg-gray-300">
            <img
              className="h-12 w-12 rounded-full text-gray-500"
              src={userData?.avatarImg}
            ></img>
          </div>
          <div className="ml-6">
            <h1 className="font-serif text-2xl font-semibold">
              {userData?.name}
            </h1>
            <p className="text-xl text-gray-600">Nike Member Since June 2024</p>
          </div>
        </div>
      )}

      {/* Favourites section */}
      <Favourite />
      {/* Sales section */}
      <Sales />
    </div>
  );
}
