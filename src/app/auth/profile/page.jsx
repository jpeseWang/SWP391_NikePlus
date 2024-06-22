"use client";

import { GetAllProduct } from "@/services/productService";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CommonUtil from "@/common/commonUtils";
import LoadingComponent from "@/app/loading";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const { productData, isLoading, isError } = GetAllProduct();
    const router = useRouter();
    const scrollContainerRef = useRef(null);

    const saleProductIds = ["66763367cb1f2afb06b841bc", "667633d0cb1f2afb06b841c0", "66763431cb1f2afb06b841c3"];

    const { data: saleProduct1, error: saleError1, isLoading: saleLoading1 } = useSWR(`/api/product/${saleProductIds[0]}`, fetcher);
    const { data: saleProduct2, error: saleError2, isLoading: saleLoading2 } = useSWR(`/api/product/${saleProductIds[1]}`, fetcher);
    const { data: saleProduct3, error: saleError3, isLoading: saleLoading3 } = useSWR(`/api/product/${saleProductIds[2]}`, fetcher);

    const saleProducts = [saleProduct1, saleProduct2, saleProduct3];

    if (status === "loading" || isLoading || saleLoading1 || saleLoading2 || saleLoading3) {
        return <LoadingComponent />;
    }

    if (!session) {
        return <p>You need to be authenticated to view this page.</p>;
    }

    if (isError) {
        return <p>Error loading products.</p>;
    }

    if (saleError1 || saleError2 || saleError3) {
        console.error("Error fetching sale products:", saleError1, saleError2, saleError3);
        return <p>Error loading sale products.</p>;
    }


    const scrollLeft = () => {
        scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <div className="p-9">
            <nav className="mb-8 flex justify-center space-x-5">
                <a href="#" className="text-gray-800 hover:text-black">Profile</a>
                <button onClick={() => router.push("/auth/profile/inbox")} className="text-gray-800 hover:text-black">Inbox</button>
                <a href="#" className="text-gray-800 hover:text-black">Order</a>
                <button onClick={() => router.push("/auth/profile/setting")} className="text-gray-800 hover:text-black">Settings</button>
            </nav>
            <div className="mb-8 flex items-center">
                <div className="w-19 h-19 rounded-full bg-gray-300 flex items-center justify-center">
                    <svg
                        className="w-12 h-12 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                    </svg>
                </div>
                <div className="ml-6">
                    <h1 className="text-2xl font-serif font-semibold">{session.user.name}</h1>
                    <p className="text-xl text-gray-600">Nike Member Since June 2024</p>
                </div>
            </div>

            <section className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Favourites</h2>
                    <div className="flex items-center space-x-2">
                        <a href="#" className="text-gray-800 hover:text-black font-semibold text-xl mr-2">View all</a>
                        <button
                            onClick={scrollLeft}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
                        >
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>
                        <button
                            onClick={scrollRight}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
                        >
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div ref={scrollContainerRef} className="flex space-x-4 overflow-x-scroll pb-4">
                    {productData?.map((product) => (
                        <a
                            key={product._id}
                            href={`/marketplace/product-overviews/${product._id}`}
                            className="group my-4 text-sm flex-none w-60"
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

            <section>
                <h2 className="text-2xl font-semibold mb-4">SALES 🔥</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {saleProducts.map((item, index) => (
                        item && (
                            <div key={index} className="border rounded-lg p-4">
                                <a href={`/marketplace/product-overviews/${item._id}`}>
                                <div className="w-full h-80 overflow-hidden rounded-lg bg-gray-100">
                                        <img
                                            src={item.specs[0]?.imgList[0]}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </a>
                                <div className="mt-2">
                                    <span className="inline-block px-2 py-1 text-sm font-semibold text-white bg-red-600 rounded-full">
                                        20% off
                                    </span>
                                </div>
                                <p className="mt-2 text-xl font-medium text-gray-700">{item.name}</p>
                                <p className="text-sm text-gray-500 line-through">{CommonUtil.parsePrice(item.price/0.8)}</p>
                                <p className="text-lg font-bold text-red-500">{CommonUtil.parsePrice(item.price)}</p>
                            </div>
                        )
                    ))}
                </div>
            </section>
        </div>
    );
}
