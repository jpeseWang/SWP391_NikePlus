"use client";
import React, { useState } from "react";
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
import { UpdatePostReact } from "@/services/postService";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { UpdatePost } from "@/services/postService";

export default function PostCard({ postData, reload }) {
  const session = useSession();
  const userID = session?.data?.id;
  const userEmail = session?.data?.email;
  const [likeCount, setLikeCount] = useState(postData.like.length);
  const [isLiked, setIsLiked] = useState(
    postData.like.some((user) => user.authorID === userID),
  );
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState(postData.comment);

  const handleUpdateReact = async (postId) => {
    const originalIsLiked = isLiked;
    const originalLikeCount = likeCount;

    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

    try {
      await UpdatePostReact(userID, postId);
      reload();
    } catch (err) {
      setIsLiked(originalIsLiked);
      setLikeCount(originalLikeCount);
      toast.error(err.message);
    }
  };

  const handleAddComment = async () => {
    if (!commentInput.trim()) return;

    const newComment = {
      authorInfo: {
        authorID: userID,
        authorEmail: session?.data?.email,
        authorName: session?.data?.name,
        authorRole: session?.data?.role,
      },
      content: commentInput,
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    setCommentInput("");

    try {
      await UpdatePost({
        ...postData,
        comment: updatedComments,
      });
      reload();
    } catch (err) {
      setComments(comments);
      toast.error(err.message);
    }
  };

  return (
    <div>
      <div className="mx-auto mt-6 max-w-md rounded-lg border p-4 ring-1 ring-gray-100 sm:max-w-xl dark:border-none  dark:bg-black dark:ring-gray-700">
        <div className="flex px-4 py-3">
          <img
            className="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1701589623520-4fb55453094c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <div className="ml-3 block">
            <div className="text-sm font-semibold leading-tight antialiased dark:text-gray-200">
              {postData.authorInfo.authorName}
            </div>

            <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {CommonUtil.getTimeDiff(postData.createdAt)}
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            src={postData.imgSrc}
            className="aspect-w-1 aspect-h-1 my-2 h-[468px] w-full rounded-lg object-cover brightness-75"
          />
          <span className="absolute bottom-[60px] z-40 pl-4 text-3xl font-medium text-white">
            {postData.content}
          </span>
          <span className="absolute bottom-[30px] z-40 pl-4 text-xl text-gray-300">
            {" "}
            {CommonUtil.getTimeDiff(postData.createdAt)}
          </span>
        </div>
        <div className=" mb-2 mt-3 flex items-center justify-between">
          <div className="flex">
            <HeartIcon
              className={`h-6 w-6 cursor-pointer ${
                isLiked ? "text-[#FF3140]" : "text-[#969696]"
              }`}
              onClick={() => {
                handleUpdateReact(postData._id);
              }}
            />

            <ChatBubbleOvalLeftIcon
              className="ml-2 h-6 w-6 cursor-pointer text-[#969696]"
              // onClick={() => {
              //   setViewModalParams(post._id)
              //   setViewModalIsOpen(true)
              // }}
            />
          </div>

          <div className="flex">
            <PaperAirplaneIcon className="h-6 w-6 -rotate-45 cursor-pointer text-[#969696] hover:text-blue-500" />
          </div>
        </div>

        <div className="my-3 mr-6 text-sm font-semibold dark:text-textDark">
          {likeCount} likes
        </div>

        <div className="max-h-[120px] overflow-y-scroll">
          {postData.comment.map((comment, idx) => (
            <div key={comment._id} className="flex">
              <div className="text-sm font-semibold antialiased dark:text-white">
                {comment.authorInfo.authorName}
              </div>{" "}
              <span className="dark:ext-gray-400 ml-1 text-sm text-gray-400">
                {comment.content}
              </span>
            </div>
          ))}
        </div>

        {/* <div className=" mr-6 mt-1 text-sm font-semibold dark:text-textDark">
          {postData.comment.length} comments
        </div> */}

        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          {postData.comment.length > 3 && (
            <p
              className="mt-1 cursor-pointer font-normal dark:text-white"
              // onClick={() => {
              //   setViewModalParams(post._id)
              //   setViewModalIsOpen(true)
              // }}
            >
              View all {postData.comment.length} comments
            </p>
          )}

          <hr className="mx-0 mb-2 mt-4" />
          <div className="flex justify-between">
            <input
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Add a comment..."
              className="my-2 bg-transparent font-normal text-gray-800 placeholder-gray-500 focus:outline-none dark:text-textDark"
            />
            {commentInput.length > 0 && (
              <div
                className="cursor-pointer text-[#0095F6]"
                onClick={handleAddComment}
              >
                Post
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
