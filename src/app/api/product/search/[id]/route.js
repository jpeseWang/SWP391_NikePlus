import { NextResponse } from 'next/server';
import Product from "@/models/Product";
import CommonUtil from "@/common/commonUtils";

// Ensure the database connection
CommonUtil.connectDB();

export const GET = async (request) => {
  const url = new URL(request.url);
  const text = url.searchParams.get('key');

  // Log the extracted text to verify
  console.log("Search text: ", text);

  if (!text) {
    return new NextResponse("Query parameter 'key' is required", { status: 400 });
  }

  const pipeline = [
    {
      $search: {
        index: "default", 
        text: {
          query: text,
          path: {
            wildcard: "*" 
          }
        }
      }
    }
  ];

  try {
    await CommonUtil.connectDB();

    const result = await Product.aggregate(pipeline);
    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error("Database error: ", err.message || err);
    return new NextResponse("Database Error: " + (err.message || err), { status: 500 });
  }
};
