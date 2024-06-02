import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

export function GetAllProduct() {
  const { data, error, isLoading } = useSWR(`/api/product/getAll`, fetcher);
  return { productData: data, isLoading, isError: error };
}

export function GetProductById(id: string) {
  const { data, error, isLoading } = useSWR(
    `/api/product/getById/${id}`,
    fetcher,
  );
  return { productData: data, isLoading, isError: error };
}

export const CreateProduct = async (productData) => {
  await fetch("/api/product/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...productData }),
  });
};

export const DeleteProduct = async (id) => {
  try {
    const response = await fetch(`/api/products/delete/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    return await response.json();
  } catch (err) {
    console.error("Error deleting product:", err);
    throw err;
  }
};
