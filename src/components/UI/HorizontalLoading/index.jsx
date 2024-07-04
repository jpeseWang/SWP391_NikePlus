import React from "react";
import "./style.css";
export default function HorizontalLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="loader flex space-x-3 rounded-full bg-transparent p-5">
        <div className="h-5 w-5 animate-bounce rounded-full bg-gray-800 dark:bg-white"></div>
        <div className="h-5 w-5 animate-bounce rounded-full bg-gray-800 dark:bg-white"></div>
        <div className="h-5 w-5 animate-bounce rounded-full bg-gray-800 dark:bg-white"></div>
      </div>
    </div>
  );
}