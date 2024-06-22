import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { signIn } from "next-auth/react";

export const CreateUser = async (userData) => {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...userData }),
  });
  return res
};

export const LoginUser = async (email, password) => {
  signIn("credentials", { email, password });
};

export function GetAllUser() {
  const { data, error, isLoading, mutate } = useSWR(`/api/product`, fetcher);
  return { productData: data, isLoading, isError: error, mutate };
}

export function GetUserById(id) {
  const { data, error, isLoading } = useSWR(
    `/api/user/${id}`,
    fetcher,
  );
  return { productData: data, isLoading, isError: error };
}

export const DeleteUser = async (id) => {
  try {
    await fetch(`/api/product/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.error("Error deleting product:", err);
    throw err;
  }
}

export const UpdateUSer = async (productData) => {
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