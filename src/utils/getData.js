export default async function getData(id) {
    const res = await fetch(`/api/product/getById/${id}`, {
      cache: "no-store",
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    return res.json();
  }