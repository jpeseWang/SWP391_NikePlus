import { NextResponse } from "next/server";
import Product from "@/models/Product";
import CommonUtil from "@/common/commonUtils";

export const GET = async (request) => {
  const url = new URL(request.url);
  //   const username = url.searchParams.get("username");
  try {
    await CommonUtil.connectDB();
    const products = await Product.find();
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error!", { status: 500 });
  }
};
