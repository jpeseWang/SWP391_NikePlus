"use client"
import React from "react";
import {
    PhotoIcon,
    GifIcon,
    AdjustmentsHorizontalIcon,
    ChatBubbleLeftIcon,
    ChatBubbleOvalLeftIcon,
    PaperAirplaneIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import CommonUtil from "@/common/commonUtils";


export default function PostCard({ postData }) {
    const handleUpdateReact = async (id) => {
        //Like
        try {
            await fetch(`/api/forum/react/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    userID: session.data.id,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            mutate()
        } catch (error) {
            console.error('Error updating rating:', error)
        }
    }

    return (
        <div>
            <div className="mx-auto mt-6 max-w-md rounded-lg border p-4 ring-1 ring-gray-100 dark:border-none dark:bg-black  dark:ring-gray-700 sm:max-w-xl">

                <div className="flex px-4 py-3">
                    <img
                        className="h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1701589623520-4fb55453094c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                    <div className="ml-3 block">
                        <div className="text-sm font-semibold leading-tight antialiased dark:text-gray-400">
                            jpese_wang
                        </div>

                        <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {CommonUtil.getTimeDiff(postData.createdAt)}
                        </div>
                    </div>
                </div>
                <div className="relative">

                    <img
                        src={postData.imgSrc}
                        className="aspect-w-1 aspect-h-1 my-2 h-[468px] w-full object-cover rounded-lg brightness-75"
                    />
                    <span className="z-40 pl-4 text-3xl font-medium absolute text-white bottom-[60px]">{postData.content}</span>
                    <span className="z-40 pl-4 text-xl absolute text-gray-300 bottom-[30px]"> {CommonUtil.getTimeDiff(postData.createdAt)}</span>
                </div>


                <div className=" mb-2 mt-3 flex items-center justify-between">
                    <div className="flex">
                        {/* <span
                className=" h-6 w-6 cursor-pointer "
                onClick={() => {
                  handleUpdateReact(post._id)
                }}
              >
                {post.react.some(
                  (rating) => rating.userID === session.data.id,
                ) ? (
                  <SolidHeartIcon className="h-6 w-6 text-[#FF3140]" />
                ) : (
                  <HeartIcon className="h-6 w-6" />
                )}
              </span> */}
                        <div>

                        </div>
                        <HeartIcon className="h-6 w-6 text-[#969696]" />  <div className="mt-1 text-sm font-semibold ml-2 mr-6">99 likes</div>

                        <ChatBubbleOvalLeftIcon
                            className="h-6 w-6 text-[#969696] cursor-pointer"
                        // onClick={() => {
                        //   setViewModalParams(post._id)
                        //   setViewModalIsOpen(true)
                        // }}
                        />
                    </div>

                    <div className="flex">
                        <PaperAirplaneIcon
                            className="h-6 w-6 cursor-pointer text-[#969696] hover:text-blue-500 -rotate-45"
                        //   onClick={() => {
                        //     handleDelete(post._id)
                        //   }}
                        />
                    </div>
                </div>

                {/* Preview comment
                <div className="flex">
                    <div className="text-sm font-semibold  antialiased dark:text-gray-400">
                        jpese_wang
                    </div>{" "}
                    <span className="ml-1 text-sm text-gray-800 dark:text-white">
                        Nice
                    </span>
                </div> */}

                <div className="text-sm font-medium text-gray-500">
                    <p
                        className="cursor-pointer font-normal mt-1"
                    // onClick={() => {
                    //   setViewModalParams(post._id)
                    //   setViewModalIsOpen(true)
                    // }}
                    >
                        View all comments
                    </p>
                    <hr className="mt-4 mb-2 mx-0" />
                    <div>
                        <input
                            // onClick={() => {
                            //   setViewModalParams(post._id)
                            //   setViewModalIsOpen(true)
                            // }}
                            placeholder="Add a comment..."
                            className="my-2 bg-transparent font-normal text-gray-800 placeholder-gray-500 focus:outline-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}