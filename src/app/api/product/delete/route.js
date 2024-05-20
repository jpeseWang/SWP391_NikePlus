import { NextResponse } from "next/server";
import Product from "@/models/Product";
import CommonUtil from "@/common/commonUtils";

export const DELETE = async (request, { params }) => {
  const { id } = params;
  try {
    await CommonUtil.connectDB();
    await Product.findByIdAndDelete(id);
    return new NextResponse("Product has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error!", { status: 500 });
  }
};
