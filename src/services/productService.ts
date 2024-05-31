import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

// function to post data
export async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}



export function GetAllProduct() {
  const { data, error, isLoading } = useSWR(`/api/product/getAll`, fetcher);
  return { productData: data, isLoading, isError: error }
}

export function GetProductById(id: string) {
  const { data, error, isLoading } = useSWR(`/api/product/getById/${id}`, fetcher);
  return { productData: data, isLoading, isError: error }
}
