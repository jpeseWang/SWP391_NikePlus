import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

export const CreateOrder = async (orderData) => {
    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...orderData }),
    });
  };
  
export function GetAllOrder() {
  const { data, error, isLoading, mutate } = useSWR(`/api/product`, fetcher);
  return { orderData: data, isLoading, isError: error, mutate };
}

export function GetOrderByUserId(userId) {
    const { data, error, isLoading } = useSWR(
      `/api/product/${userId}`,
      fetcher,
    );
    return { productData: data, isLoading, isError: error };
  }

export function GetOrderById(id) {
  const { data, error, isLoading } = useSWR(
    `/api/product/${id}`,
    fetcher,
  );
  return { productData: data, isLoading, isError: error };
}

export const UpdateOrder = async (productData) => {
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


export const DeleteOrder = async (id) => {
    try {
      await fetch(`/api/product/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Error deleting product:", err);
      throw err;
    }
  }
  