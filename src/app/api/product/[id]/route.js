import { NextResponse } from "next/server";
import Product from "@/models/Product";
import CommonUtil from "@/common/commonUtils";

// Get Product by ID API
export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await CommonUtil.connectDB();
    const product = await Product.findById(id);
    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error!", { status: 500 });
  }
};


// Update Product API
export const PUT = async (request, { params }) => {
  const { id } = params;
<<<<<<< HEAD
  const updatedProduct = await request.json();

  try {
    await CommonUtil.connectDB();
    const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
=======
  const { productData } = await request.json();

  try {
    await CommonUtil.connectDB();
    const product = await Product.findByIdAndUpdate(id, productData, { new: true });
>>>>>>> 7da93aec6914625fae18d09e55a916c11467f1b9

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    return new NextResponse("Product has been updated", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

<<<<<<< HEAD
=======
// Patch Product API
export const PATCH = async (request, { params }) => {
  const { id } = params;
  const updatedFields = await request.json();

  try {
    await CommonUtil.connectDB();
    const product = await Product.findByIdAndUpdate(id, { $set: updatedFields }, { new: true });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    return new NextResponse("Product has been updated", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};


>>>>>>> 7da93aec6914625fae18d09e55a916c11467f1b9
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
