import User from "@/models/User";
import CommonUtil from "@/common/commonUtils";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  const { password, email } = await request.json();

  await CommonUtil.connectDB();

  const existingUser = await User.findOne({ email });

  const hashedPassword = await bcrypt.hash(password, 5);
  existingUser.password = hashedPassword;

  existingUser.resetToken = undefined;
  existingUser.resetTokenExpiry = undefined;

  try {
    await existingUser.save();
    return new NextResponse(JSON.stringify({ message: "User's password is updated!" }), { status: 200 });
  } catch (err) {
    return new NextResponse(err, { status: 500 });
  }

};