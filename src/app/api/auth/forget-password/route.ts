import User from "@/models/User";
import CommonUtil from "@/common/commonUtils";
import { NextResponse } from "next/server";
import crypto from 'crypto';

export const POST = async (request : any) => {
  const { email } = await request.json();

  await CommonUtil.connectDB();

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return new NextResponse("Email doesn't exist.", { status: 400 });
  }

  const resetToken = crypto.randomBytes(20).toString('hex');
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const passwordResetExpires = Date.now() + 3600000;

  existingUser.resetToken = passwordResetToken;
  existingUser.resetTokenExpiry = passwordResetExpires;
  const resetUrl = `localhost:3000/auth/reset-password/${resetToken}`;

  try {
    await existingUser.save();

    return new NextResponse(JSON.stringify({ to_email: email, resetUrl }), { status: 200 });
  } catch (error) {
    console.error("Error initiating password reset: ", error);
    return new NextResponse("Failed to initiate password reset.", { status: 500 });
  }
};
