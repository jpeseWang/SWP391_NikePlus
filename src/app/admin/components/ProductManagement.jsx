import React from "react";
import ListAllProduct from "../components/Product/ListAll";
import AddProduct from "../components/Product/AddProduct";
import { useRouter, useSearchParams } from "next/navigation";
const navigation = [
  {
    name: "ListAllProducts",
    component: <ListAllProduct />,
  },
  {
    name: "AddProduct",
    component: <AddProduct />,
  },
];
export default function ProductManagement() {
  const paramUrl = useSearchParams().get("section");

  const matchedNavigationItem = navigation.find(
    (item) => item.name === paramUrl,
  );
  return (
    <div>
      {matchedNavigationItem ? (
        matchedNavigationItem.component
      ) : (
        <div>page not found</div>
      )}
    </div>
  );
}
