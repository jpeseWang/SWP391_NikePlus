import { NextResponse } from "next/server";
import User from "@/models/User";
import CommonUtil from "@/common/commonUtils";

export const GET = async (request) => {
  const url = new URL(request.url);
  //   const username = url.searchParams.get("username");
  try {
    await CommonUtil.connectDB();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error!", { status: 500 });
  }
};
