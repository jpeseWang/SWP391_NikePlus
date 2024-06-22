import { NextResponse } from "next/server";
import User from "@/models/User";
import CommonUtil from "@/common/commonUtils";

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await CommonUtil.connectDB();
    const product = await User.findById(id);
    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error!", { status: 500 });
  }
};
