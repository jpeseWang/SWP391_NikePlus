import React from "react";

export default function ApiConfiguration() {
  return (
    <div>
      <h1 className="dark:text-textDark text-2xl font-semibold mt-4">
        ApiConfiguration
      </h1>

      <div className="ring-1 ring-gray-200 rounded py-2 px-2 mt-9">
        <div className="flex mb-2">
          <h1 className="font-medium">GET</h1>
          <span className="ml-2 inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
            Public
          </span>
        </div>

        <div>
          <code className="ml-2 ring-1 bg-[#F2F3F9] relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            POST /api/products/{"{productId}"}/reviews
          </code>
        </div>
      </div>

      <div className="ring-1 ring-gray-200 rounded py-2 px-2 mt-9">
        <div className="flex mb-2">
          <h1 className="font-medium">CREATE</h1>
          <span className="ml-2 inline-flex items-center rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
            Seller
          </span>
        </div>

        <div>
          <code className="ml-2 ring-1 bg-[#F2F3F9] relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            /api/products/{"{productId}"}
          </code>
        </div>
      </div>

      <div className="ring-1 ring-gray-200 rounded py-2 px-2 mt-9">
        <div className="flex mb-2">
          <h1 className="font-medium">UPDATE</h1>
          <span className="ml-2 inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
            Admin
          </span>
        </div>

        <div>
          <code className="ml-2 ring-1 bg-[#F2F3F9] relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            /api/users/{"{userId}"}/orders
          </code>
        </div>
      </div>
    </div>
  );
}
