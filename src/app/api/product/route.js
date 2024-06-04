import { NextResponse } from "next/server";
import Product from "@/models/Product";
import CommonUtil from "@/common/commonUtils";

// Create Product API
export const POST = async (request) => {
  const body = await request.json();
  const product = new Product(body);

  try {
    await CommonUtil.connectDB();
    await product.save();
    return new NextResponse("Product has been created", { status: 201 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

// Get All Product API
export const GET = async () => {
    try {
      await CommonUtil.connectDB();
      const products = await Product.find();
      return new NextResponse(JSON.stringify(products), { status: 200 });
    } catch (err) {
      return new NextResponse("Database Error!", { status: 500 });
    }
  };
  

