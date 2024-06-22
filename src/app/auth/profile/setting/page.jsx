"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

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
          <button onClick={() => router.push("/auth/profile")} className="text-gray-800 hover:text-black">Profile</button>
          <button onClick={() => router.push("/auth/profile/inbox")} className="text-gray-800 hover:text-black">Inbox</button>
          <a href="#" className="text-gray-800 hover:text-black">Order</a>
          <button onClick={() => router.push("/auth/profile/setting")} className="text-gray-800 hover:text-black">Settings</button>
        </div>
      </nav>

      <div className="flex flex-1">
        <nav className="w-1/4 p-8 border-r border-gray-200">
          <ul>
            <li>
              <a href="#account-details" className="block py-2 font-semibold text-gray-700 hover:text-black">Account Details</a>
            </li>
            <li>
              <a href="#payment-methods" className="block py-2 font-semibold text-gray-700 hover:text-black">Payment Methods</a>
            </li>
            <li>
              <a href="#delivery-addresses" className="block py-2 font-semibold text-gray-700 hover:text-black">Delivery Addresses</a>
            </li>
            <li>
              <a href="#shop-preferences" className="block py-2 font-semibold text-gray-700 hover:text-black">Shop Preferences</a>
            </li>
            <li>
              <a href="#communication-preferences" className="block py-2 font-semibold text-gray-700 hover:text-black">Communication Preferences</a>
            </li>
          </ul>
        </nav>

        <div className="w-3/4 p-8">
          <section id="account-details">
            <h2 className="text-2xl font-bold">Account Details</h2>
            <div className="flex items-center mt-4">
              <img
                src="/placeholder-image.png"
                alt="Profile"
                className="w-16 h-16 rounded-full"
              />
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <div className="px-20">
                    <p className="text-lg font-semibold">{formData.accountName || "Account Name"}</p>
                    <p className="text-gray-500 font-semibold">{formData.email || "Email"}</p>
                  </div>
                  <a href="#" className="text-blue-500">Edit</a>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
                <a href="#" className="text-blue-500">Edit</a>
              </div>
              <p className="text-gray-500">***********</p>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label htmlFor="phoneNumber" className="block text-gray-700 font-medium">Phone Number</label>
                <a href="#" className="text-blue-500">Edit</a>
              </div>
              <p className="text-gray-500">0xxx - xxx - xxx</p>
            </div>
            <form onSubmit={handleSave} className="space-y-6 mt-6">
              <div>
                <label htmlFor="dateOfBirth" className="block text-gray-700 font-medium">Date of Birth</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-gray-700 font-medium">Country/Region</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                >
                  <option value="Viet Nam">Viet Nam</option>
                </select>
              </div>
              <div>
                <label htmlFor="province" className="block text-gray-700 font-medium">Province</label>
                <select
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                >
                  <option value="">Choose*</option>
                </select>
              </div>
              <div>
                <label htmlFor="city" className="block text-gray-700 font-medium">Town/City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="postcode" className="block text-gray-700 font-medium">Postcode</label>
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                >
                  Save
                </button>
                <button
                  onClick={handleDeleteAccount}
                  type="button"
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                >
                  Delete Account
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
