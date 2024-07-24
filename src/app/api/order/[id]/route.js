import { NextResponse } from "next/server";
import Order from "@/models/Order";
import CommonUtil from "@/common/commonUtils";

// Get Product by ID API
export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await CommonUtil.connectDB();
    const order = await Order.findById(id);
    return new NextResponse(JSON.stringify(order), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error!", { status: 500 });
  }
};

// Update Product API
export const PUT = async (request, { params }) => {
  const { id } = params;
  const { productData } = await request.json();

  try {
    await CommonUtil.connectDB();
    const product = await Order.findByIdAndUpdate(id, productData, {
      new: true,
    });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    return new NextResponse("Product has been updated", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

// Patch Product API
export const PATCH = async (request, { params }) => {
  const { id } = params;
  const updatedFields = await request.json();

  console.log("Received updated fields:", updatedFields);
  console.log("ID:", id);

  try {
      await CommonUtil.connectDB();
      const user = await Order.findByIdAndUpdate(id, { $set: updatedFields }, { new: true });

      if (!user) {
          return new NextResponse(JSON.stringify({ error: "Order not found" }), { status: 404 });
      }
      return new NextResponse(JSON.stringify({ message: "Order has been updated" }), { status: 200 });
  } catch (err) {
      console.error("Database error:", err);
      return new NextResponse(JSON.stringify({ error: "Database error" }), { status: 500 });
  }
};

// Delete Product API
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
