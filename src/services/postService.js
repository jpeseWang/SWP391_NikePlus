import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

export function GetAllPost() {
  const { data, error, isLoading, mutate } = useSWR(`/api/post`, fetcher);
  return { postData: data, isLoading, isError: error, mutate };
}

export function GetPostById(id) {
  const { data, error, isLoading } = useSWR(
    `/api/post/${id}`,
    fetcher,
  );
  return { postData: data, isLoading, isError: error };
}

export const CreatePost = async (postData) => {
  await fetch("/api/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...postData }),
  });
};

export const DeletePost = async (id) => {
  try {
    await fetch(`/api/post/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.error("Error deleting post:", err);
    throw err;
  }
}

export const UpdatePost = async (postData) => {
  const id = postData._id;
  try {
    const response = await fetch(`/api/post/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postData
      }),
    });
    return response.status;
  } catch (error) {
    console.error(error);
  }
};
