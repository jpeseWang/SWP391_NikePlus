import { NextResponse } from "next/server";
import User from "@/models/User";
import CommonUtil from "@/common/commonUtils";

export const POST = async (request) => {
  const { email } = await request.json();

  await CommonUtil.connectDB();

  try {
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({ exists: true });
    } else {
      return NextResponse.json({ exists: false });
    }
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};