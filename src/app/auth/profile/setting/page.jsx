"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProfileInfo from '../components/ProfileInfo/index';

const SettingsPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    accountName: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
    country: "Viet Nam",
    province: "",
    city: "",
    postcode: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Handle save logic here
    console.log("Form Data Saved: ", formData);
  };

  const handleDeleteAccount = () => {
    console.log("Account Deleted");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <nav className="w-full bg-white shadow mb-8">
        <div className="container mx-auto px-4 py-4 flex justify-center space-x-5">
          <a href="/auth/profile" className="text-gray-800 hover:text-black">Profile</a>
          <a href="/auth/profile/inbox" className="text-gray-800 hover:text-black">Inbox</a>
          <a href="/order/history" className="text-gray-800 hover:text-black">Order</a>
          <a href="/auth/profile/setting" className="text-gray-800 hover:text-black">Settings</a>
        </div>
      </nav>
      <ProfileInfo/>

    </div>

  );
};

export default SettingsPage;
