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
  return res;
};

export const LoginUser = async (email, password) => {
  signIn("credentials", { email, password });
};

export function GetAllUser() {
  const { data, error, isLoading, mutate } = useSWR(`/api/user/getAll`, fetcher);
  return { userData: data, isLoading, isError: error, mutate };
}

export function GetUserById(id) {
  const { data, error, isLoading } = useSWR(`/api/user/getById/${id}`, fetcher);
  return { userData: data, isLoading, isError: error };
}

export const DeleteUser = async (id) => {
  try {
    await fetch(`/api/user/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.error("Error deleting product:", err);
    throw err;
  }
};

export async function UpdateUser(userId, updateData) {
  try {
    const response = await fetch(`/api/user/${userId}`, {
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

export const changePassword = async (userId, currentPassword, newPassword) => {
  try {
    const res = await fetch(`/api/user/changePassword/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res.json();
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};
