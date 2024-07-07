"use client";
import React, { useEffect, useState } from "react";
import { GetAllAuction } from "@/services/auctionService";
import HorizontalLoading from "@/components/UI/HorizontalLoading";
import CommonUtil from "@/common/commonUtils";
// import { getTimeLeft } from "@/common/commonUtils";

export default function AuctionList() {
  const { auctionData, isLoading, isError } = GetAllAuction();

  return (
    <div>
      {isLoading ? (
        <HorizontalLoading />
      ) : (
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {auctionData?.map((post) => (
            <AuctionPost key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

function AuctionPost({ post }) {
  const [timeLeft, setTimeLeft] = useState(
    CommonUtil.getTimeLeft(post.auctionEndTime),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(CommonUtil.getTimeLeft(post.auctionEndTime));
    }, 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [post.auctionEndTime]);

  return (
    <article className="flex flex-col items-start justify-between rounded-3xl px-4 py-4 shadow-lg">
      <div className="relative w-full">
        <img
          src={post.item.imgSrc}
          alt=""
          className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div className="w-full">
        <div className="mt-8 flex items-center gap-x-4 text-xs">
          <time dateTime={post.datetime} className="text-gray-500">
            {post.createdAt}
          </time>
          <a
            href="#"
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            {post.auctioneerInfo.auctioneerName}
          </a>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <a href={post.href}>
              <span className="absolute inset-0" />
              {post.item.name}
            </a>
          </h3>
          <div className="my-4 flex justify-between">
            <span className="text-lg font-bold text-[#F73E91]">
              {post.startingBid} USD
            </span>
            <span className="font-medium text-gray-500">Highest Bid</span>
          </div>
        </div>
        <div className="relative mt-8 flex items-center justify-between gap-x-4">
          <div className="leading-6">
            <p className="font-semibold text-gray-900">
              <a href="#">
                <span className="font-prompt absolute inset-0 text-lg" />
                {timeLeft}
              </a>
            </p>
            <p className="text-base text-gray-600">End Time</p>
          </div>
          <button
            type="button"
            className="rounded-md bg-[#7109B6] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Place A Bid
          </button>
        </div>
      </div>
    </article>
  );
}
