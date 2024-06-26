"use client";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingComponent from "@/app/loading";
import PostComment from "./comment/post-comment";

export default function BlogDetails({ params }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(
    `/api/posts/${params.id}`,
    fetcher
  );

  return (
    <>
      {" "}
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <div className="bg-transparent px-6 py-32 lg:px-8 ">
            <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
              <p className="text-base font-semibold leading-7 text-indigo-600">
                Blogs
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {data.title}
              </h1>

              <figcaption className="mt-4 flex gap-x-4">
                By
                <img
                  className="h-6 w-6 flex-none rounded-full bg-gray-50"
                  src={data.authorAvatar}
                  alt=""
                />
                <div className="text-sm leading-6">
                  <strong className="font-semibold text-gray-900">
                    {data.author}
                  </strong>{" "}
                  – {data.authorCareer},{" "}
                  <span className="ml-auto">
                    Published{" "}
                    <span className="italic font-semibold">{data.date}</span>
                  </span>
                </div>
              </figcaption>
              <p className="mt-6 text-xl leading-8">{data.description}</p>
              <figcaption className="mt-6 gap-x-4">
                <img
                  className="aspect-video rounded-xl bg-gray-50 object-cover"
                  src={data.imgSrc}
                  alt=""
                />
              </figcaption>
              <div
                className="mt-10 max-w-2xl"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            </div>
            <PostComment id={params.id} data={data} reload={mutate} />
          </div>
        </>
      )}
    </>
  );
}
