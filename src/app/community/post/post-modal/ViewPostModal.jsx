"use client";
import React, { useState, useEffect, useRef, Fragment } from "react";
import {
  XMarkIcon,
  FaceSmileIcon,
  ChatBubbleOvalLeftIcon,
  PaperAirplaneIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Modal from "react-modal";
import toast from "react-hot-toast";
import { classNames } from "@/utils/classNames";
import HorizontalLoading from "@/components/UI/HorizontalLoading";
import { GetPostById } from "@/services/postService";
import { Tab } from "@headlessui/react";
import CommonUtil from "@/common/commonUtils";
export const customStyles = {
  content: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    height: "100%",
  },
};

export default function ViewPostModal({ isOpen, onClose, reload, params }) {
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const [isInputCommentOpen, setIsInputCommentOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { data, isError, isLoading } = GetPostById(params);

  const [inputValue, setInputValue] = useState("");

  let date = new Date().toUTCString().slice(5, 16);
  const session = useSession();
  const router = useRouter();

  const handleUpdateReact = async (id) => {
    //Like
    try {
      await fetch(`/api/forum/react/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          userID: session.data.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      mutate();
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };
  if (session.status === "unauthenticated") {
    router?.push("/auth/login");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      await fetch(`/api/forum/comment/${params}`, {
        method: "PUT",
        body: JSON.stringify({
          name: session.data.fullname,
          userID: session.data.id,
          avatar: session.data.avatar,
          content: inputValue,
          date,
        }),
      });

      setInputValue("");
      e.target.reset();
      setUploading(false);
      mutate();
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      {isLoading ? (
        <HorizontalLoading />
      ) : (
        <div className="bg-white dark:bg-black">
          <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="absolute right-0 top-0 hidden pr-10 pt-10 sm:block">
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => onClose()}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Post */}

            <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
              {/* Post image */}
              <div className="lg:col-span-4 lg:row-end-1">
                <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-700">
                  <img
                    src={data?.imgSrc}
                    className="object-cover object-center"
                  />
                </div>
              </div>

              {/* Post details */}
              <div className="mx-auto mt-14 max-w-4xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
                <div className="flex flex-col-reverse">
                  <div className="mt-4">
                    <div className="flex items-center py-3">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={data?.authorInfo}
                      />
                      <div className="ml-3 ">
                        <span className="block text-sm font-semibold leading-tight antialiased">
                          {data?.authorInfo?.authorName}
                        </span>
                        <span className="block text-xs text-gray-500 dark:text-gray-400">
                          {CommonUtil.getTimeDiff(data?.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-gray-500 dark:text-gray-300">
                  {data?.content}
                </p>
                <div>
                  <div className=" mt-6 flex items-center justify-between border-t  border-gray-200 pt-4 ">
                    <div className="flex gap-4">
                      <span
                        className="h-7 w-7 cursor-pointer "
                        onClick={() => {
                          handleUpdateReact(data._id);
                        }}
                      >
                        <SolidHeartIcon className="h-7 w-7 text-[#FF3140]" />
                      </span>
                      <ChatBubbleOvalLeftIcon
                        className="h-7 w-7 cursor-pointer"
                        onClick={() => {
                          setIsInputCommentOpen(!isInputCommentOpen);
                        }}
                      />
                    </div>

                    <div className="flex">
                      <PaperAirplaneIcon className="h-7 w-7 -rotate-12" />
                    </div>
                  </div>
                  <div className="border-b border-gray-200 pb-2">
                    <p className="mt-2 text-sm font-semibold">
                      {data?.like?.length} likes
                    </p>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                  <button
                    type="button"
                    className="hover:opacity-0.5 flex hidden w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-sky-500 to-indigo-500 px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    {data?.like?.length} lượt thích
                  </button>
                  <button
                    type="button"
                    className="flex h-0 w-full items-center justify-center rounded-md border border-transparent  px-8 py-3 text-base font-medium text-transparent  "
                  >
                    Comment now
                  </button>
                </div>

                {isInputCommentOpen && (
                  <div className="mt-0">
                    <div className="prose-sm prose text-gray-500">
                      <div className="flex items-start space-x-4 bg-white dark:bg-black">
                        <div className="flex-shrink-0">
                          <img
                            className="inline-block h-10 w-10 rounded-full"
                            src={session.data.avatar}
                            alt=""
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <form onSubmit={handleSubmit} className="relative">
                            <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                              <label htmlFor="comment" className="sr-only">
                                Add your comment
                              </label>
                              <textarea
                                rows={3}
                                name="comment"
                                id="comment"
                                className="block w-full resize-none border-0 bg-transparent px-1.5 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-gray-200"
                                placeholder="Bình luận của bạn..."
                                onChange={(e) => {
                                  setInputValue(e.target.value);
                                  console.log(inputValue);
                                }}
                                value={inputValue}
                              />
                            </div>

                            <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
                              <div className="flex items-center space-x-5">
                                <div className="flex items-center">
                                  <div>
                                    <>
                                      <div className="relative">
                                        <button className="relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                                          <span className="flex items-center justify-center">
                                            <span>
                                              <FaceSmileIcon
                                                className="h-5 w-5 flex-shrink-0"
                                                aria-hidden="true"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  setIsOpenEmoji(!isOpenEmoji);
                                                }}
                                              />
                                              <span className="sr-only">
                                                Add your mood
                                              </span>
                                            </span>
                                          </span>
                                        </button>
                                      </div>
                                      <div className="absolute mb-36 sm:ml-6">
                                        {isOpenEmoji && (
                                          <EmojiPicker
                                            height={390}
                                            width={350}
                                            onEmojiClick={onChangeEmoji}
                                            autoFocusSearch={false}
                                          />
                                        )}
                                      </div>
                                    </>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-shrink-0">
                                <button
                                  type="submit"
                                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                  Post
                                </button>
                              </div>
                            </div>
                          </form>
                          {uploading && (
                            <p className="text-gray-500 dark:text-gray-300">
                              Uploading...
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
                <Tab.Group as="div">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8">
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            selected
                              ? "border-indigo-600 text-indigo-600 dark:text-indigo-500"
                              : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800",
                            "whitespace-nowrap border-b-2 py-6 text-sm font-medium",
                          )
                        }
                      >
                        Bình luận
                      </Tab>
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    <Tab.Panel className="-mb-10">
                      <h3 className="sr-only">Write your own comment</h3>
                      {data?.comment?.length > 0 ? (
                        <>
                          {data.comment
                            .slice()
                            .reverse()
                            .map((review, reviewIdx) => (
                              <div
                                key={review.id}
                                className="flex space-x-4 text-sm text-gray-500"
                              >
                                <div className="flex-none py-10">
                                  <img
                                    src={review.avatar}
                                    alt=""
                                    className="h-10 w-10 rounded-full bg-gray-100"
                                  />
                                </div>
                                <div
                                  className={classNames(
                                    reviewIdx === 0
                                      ? ""
                                      : "border-t border-gray-200",
                                    "py-10",
                                  )}
                                >
                                  <h3 className="font-medium text-gray-900 dark:text-gray-300">
                                    {review.name}
                                  </h3>
                                  <p className="dark:text-gray-400">
                                    {review.date}
                                  </p>

                                  <div className="prose-sm prose mt-4 max-w-none text-gray-500 dark:text-gray-300">
                                    {review.content}{" "}
                                  </div>
                                  {/* {session.data.id === review.userID && (
                                    <TrashIcon
                                      className=" mr-0 inline h-6 w-6 cursor-pointer hover:text-red-500"
                                      onClick={() => {
                                        handleDelete(params, review._id)
                                      }}
                                    />
                                  )} */}
                                </div>
                              </div>
                            ))}
                        </>
                      ) : (
                        <p className="mt-4 text-gray-500">
                          Chưa có bình luận nào.
                        </p>
                      )}
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
