import { NextResponse } from "next/server";
import Order from "@/models/Order";
import CommonUtil from "@/common/commonUtils";

// Create Order API
export const POST = async (request) => {
  const body = await request.json();
  const order = new Order(body);

  try {
    await CommonUtil.connectDB();
    await order.save();
    return new NextResponse("Order has been created", { status: 201 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

// Get All Order API
export const GET = async () => {
    try {
      await CommonUtil.connectDB();
      const orders = await Order.find();
      return new NextResponse(JSON.stringify(orders), { status: 200 });
    } catch (err) {
      return new NextResponse("Database Error!", { status: 500 });
    }
  };
  

