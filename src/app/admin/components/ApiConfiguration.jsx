import React from "react";

export default function ApiConfiguration() {
  return (
    <div>
      <h1 className="mt-4 text-2xl font-semibold dark:text-textDark">
        ApiConfiguration
      </h1>

      <div className="mt-9 rounded px-2 py-2 ring-1 ring-gray-200">
        <div className="mb-2 flex">
          <h1 className="font-medium">GET</h1>
          <span className="ml-2 inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
            Public
          </span>
        </div>

        <div>
          <code className="bg-muted font-mono relative ml-2 rounded bg-[#F2F3F9] px-[0.3rem] py-[0.2rem] text-sm font-semibold ring-1">
            POST /api/products/{"{productId}"}/reviews
          </code>
        </div>
      </div>

      <div className="mt-9 rounded px-2 py-2 ring-1 ring-gray-200">
        <div className="mb-2 flex">
          <h1 className="font-medium">CREATE</h1>
          <span className="ml-2 inline-flex items-center rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
            Seller
          </span>
        </div>

        <div>
          <code className="bg-muted font-mono relative ml-2 rounded bg-[#F2F3F9] px-[0.3rem] py-[0.2rem] text-sm font-semibold ring-1">
            /api/products/{"{productId}"}
          </code>
        </div>
      </div>

      <div className="mt-9 rounded px-2 py-2 ring-1 ring-gray-200">
        <div className="mb-2 flex">
          <h1 className="font-medium">UPDATE</h1>
          <span className="ml-2 inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
            Admin
          </span>
        </div>

        <div>
          <code className="bg-muted font-mono relative ml-2 rounded bg-[#F2F3F9] px-[0.3rem] py-[0.2rem] text-sm font-semibold ring-1">
            /api/product/create
          </code>
        </div>
      </div>
    </div>
  );
}
