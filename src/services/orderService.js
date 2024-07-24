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
  const { data, error, isLoading, mutate } = useSWR(`/api/order`, fetcher);
  return { orderData: data, isLoading, isError: error, mutate };
}

export function GetOrderByUserId(userId) {
  const { data, error, isLoading } = useSWR(
    `/api/order/getByUserId/${userId}`,
    fetcher,
  );
  return { orderData: data, isLoading, isError: error };
}

export function GetOrderById(id) {
  const { data, error, isLoading } = useSWR(`/api/order/${id}`, fetcher);
  return { orderData: data, isLoading, isError: error };
}

export const UpdateOrder = async (productData) => {
  const id = productData._id;
  try {
    const response = await fetch(`/api/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productData,
      }),
    });
    return response.status;
  } catch (error) {
    console.error(error);
  }
};

export async function UpdateOrder1(orderId, updateData) {
  try {
    const response = await fetch(`/api/order/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    console.error("Error in UpdateUser:", error);
    return { ok: false, error };
  }
}

export const DeleteOrder = async (id) => {
  try {
    await fetch(`/api/product/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.error("Error deleting product:", err);
    throw err;
  }
};
