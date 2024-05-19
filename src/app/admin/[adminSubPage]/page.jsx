"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ApiConfiguration from "../components/ApiConfiguration";
import DashBoard from "../components/DashBoard";
import UserManagement from "../components/UserManagement";
import ProductManagement from "../components/ProductManagement";
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
    component: <ApiConfiguration />,
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
    (item) => item.name === paramUrl
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
