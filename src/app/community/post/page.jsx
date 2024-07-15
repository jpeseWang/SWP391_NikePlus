"use client";
import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingComponent from "@/app/loading";
import { motion } from "framer-motion";
import CreatePostModal from "./post-modal/CreatePostModal";
import PostCard from "./components/PostCard";

export default function Blog() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const session = useSession();
  const router = useRouter();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR("/api/post", fetcher);

  if (session.status === "loading") {
    return <LoadingComponent />;
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className=" sm:py-22 py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          {session.status === "authenticated" &&
            typeof document !== "undefined" && (
              <div className="mb-10 rounded px-2 py-4 text-center ring-2 ring-gray-200">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Create new Blog
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating a new blog.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  >
                    <PlusIcon
                      className="-ml-0.5 mr-1.5 h-5 w-5"
                      aria-hidden="true"
                    />
                    New Blogs
                  </button>
                </div>
              </div>
            )}
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            From the blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-textDark">
            Learn how to grow your career with our expert advice.
          </p>
          <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
            {isLoading ? (
              <LoadingComponent />
            ) : (
              <>
                {data &&
                  data
                    .slice()
                    .reverse()
                    .map((post) => (
                      <PostCard postData={post} reload={mutate} />
                    ))}
              </>
            )}
          </div>
        </div>
      </div>
      {modalIsOpen && (
        <CreatePostModal
          isOpen={modalIsOpen}
          onClose={closeModal}
          reload={mutate}
        />
      )}
    </div>
  );
}
