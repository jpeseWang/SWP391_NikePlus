import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

export function GetAllProduct() {
  const { data, error, isLoading, mutate } = useSWR(`/api/product`, fetcher);
  return { productData: data, isLoading, isError: error, mutate };
}

export function GetProductById(id) {
  const { data, error, isLoading } = useSWR(
    `/api/product/${id}`,
    fetcher,
  );
  return { productData: data, isLoading, isError: error };
}

export const CreateProduct = async (productData) => {
  await fetch("/api/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...productData }),
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
  const id = productData._id
  try {
    const response = await fetch(`/api/product/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        productData
      }),
    });
    return response.status;
  } catch (error) {
    console.error(error);
  }
};

