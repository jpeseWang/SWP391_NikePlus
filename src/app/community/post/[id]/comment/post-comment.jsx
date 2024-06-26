"use client";
import { useState, useEffect } from "react";
import { classNames } from "@/utils/classNames";
import ReactStars from "react-rating-stars-component";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const reviews = [
  {
    id: 1,
    rating: 5,
    content: `
      <p>This icon pack is just what I need for my latest project. There's an icon for just about anything I could ever need. Love the playful look!</p>
    `,
    date: "July 16, 2021",
    datetime: "2021-07-16",
    author: "Emily Selman",
    avatarSrc:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
  },
  {
    id: 2,
    rating: 5,
    content: `
      <p>Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.</p>
    `,
    date: "July 12, 2021",
    datetime: "2021-07-12",
    author: "Hector Gibbons",
    avatarSrc:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
  },
  // More reviews...
];

export default function PostComment({ id, data, reload }) {
  const [uploading, setUploading] = useState(false);
  const [content, setContent] = useState("");
  const session = useSession();
  let date = new Date().toUTCString().slice(5, 16);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: session.data.fullname,
          id: session.data.id,
          avatar: session.data.avatar,
          content,
          date,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Rating updated successfully");
      } else {
        console.error("Failed to update rating");
      }
      reload();
      e.target.reset();
      setUploading(false);
    } catch (error) {
      console.error("Error updating rating:", error);
      toast.error("Error updating rating");
    }
  };
  return (
    <div className="bg-white mt-20">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 my-4">
          Comment Section
        </h2>
        {session.status === "authenticated" ? (
          <div className="flex items-start space-x-4 my-6 mb-12">
            <div className="flex-shrink-0">
              <img
                className="inline-block h-10 w-10 rounded-full"
                src={session.data.avatar}
                alt=""
              />
            </div>
            <div className="min-w-0 flex-1">
              <form className="relative w-1/2" onSubmit={handleSubmit}>
                <div className="grid gap-4 mt-2">
                  <div className="col-span-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                    <label htmlFor="comment" className="sr-only">
                      Add your comment
                    </label>
                    <textarea
                      rows={3}
                      name="comment"
                      id="comment"
                      className="block w-full resize-none border-0 bg-transparent py-1.5 px-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Add your comment..."
                      defaultValue={""}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
                  <div className="flex items-center space-x-5"></div>
                  <div className="flex-shrink-0">
                    <button
                      type="submit"
                      className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 mr-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </form>
              {uploading && (
                <div className="font-medium py-1">Uploading...</div>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="-my-10">
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
                    reviewIdx === 0 ? "" : "border-t border-gray-200",
                    "flex-1 py-10"
                  )}
                >
                  <h3 className="font-medium text-gray-900">{review.name}</h3>
                  <p>
                    <time dateTime={review.datetime}>{review.date}</time>
                  </p>

                  <div className="prose prose-sm mt-4 max-w-none text-gray-500">
                    {review.content}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
