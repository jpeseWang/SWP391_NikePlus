import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

export function GetAllPost() {
  const { data, error, isLoading, mutate } = useSWR(`/api/post`, fetcher);
  return { postData: data, isLoading, isError: error, mutate };
}

export function GetProductById(id) {
  const { data, error, isLoading } = useSWR(
    `/api/product/${id}`,
    fetcher,
  );
  return { productData: data, isLoading, isError: error };
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

export const CreateInventory = async (productData) => {
  await fetch("/api/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...productData }),
  });
};

export const DeleteProduct = async (id) => {
  try {
    await fetch(`/api/product/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.error("Error deleting product:", err);
    throw err;
  }
}

export const UpdateProduct = async (productData) => {
  const id = productData._id;
  try {
    const response = await fetch(`/api/product/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productData
      }),
    });
    return response.status;
  } catch (error) {
    console.error(error);
  }
};
