import { NextResponse } from "next/server";
import Product from "@/models/Product";
import CommonUtil from "@/common/commonUtils";

// Ensure the database connection
CommonUtil.connectDB();

export const GET = async (request, { params }) => {
  const { id } = params;
  const text = "jordan";
  const body = await request.json();
  // Log the extracted text to verify
  console.log("Search text: ", text);
  let pipeline = [
    {
      $search: {
        index: "default",
        text: {
          query: id,
          path: {
            wildcard: "*",
          },
        },
      },
    },
  ];

  try {
    await CommonUtil.connectDB();

    const result = await Product.aggregate(pipeline);
    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error("Database error: ", err.message || err);
    return new NextResponse("Database Error: " + (err.message || err), {
      status: 500,
    });
  }
};
