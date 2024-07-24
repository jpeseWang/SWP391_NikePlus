"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ApiConfiguration from "../components/ApiConfiguration";
import DashBoard from "../components/DashBoard";
import UserManagement from "../components/User/ListAll";
import ProductManagement from "../components/ProductManagement";
import Orders from "../components/Orders";
const navigation = [
  {
    name: "Dashboard",
    component: <DashBoard />,
  },
  {
    name: "User Management",
    component: <UserManagement />,
  },
  {
    name: "Product Management",
    component: <ProductManagement />,
  },

  {
    name: "API Configuration",
    component: <ApiConfiguration />,
  },
  {
    name: "Orders",
    component: <Orders/>,
  },
  {
    name: "Settings",
    component: <ApiConfiguration />,
  },
];

export default function PageDetails({ params }) {
  // const paramUrl = decodeURIComponent(params.adminSubPage);
  const paramUrl = useSearchParams().get("title");

  const matchedNavigationItem = navigation.find(
    (item) => item.name === paramUrl,
  );
  return (
    <div className="h-screen">
      {matchedNavigationItem ? (
        matchedNavigationItem.component
      ) : (
        <div>page not found</div>
      )}
    </div>
  );
}
