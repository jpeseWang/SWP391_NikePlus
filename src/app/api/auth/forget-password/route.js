import User from "@/models/User";
import CommonUtil from "@/common/commonUtils";
import { NextResponse } from "next/server";
import crypto from 'crypto';

export const POST = async (request) => {
  try {
    const { email } = await request.json();

    await CommonUtil.connectDB();

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return new NextResponse(JSON.stringify({ error: "Email doesn't exist." }), { status: 400 });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');

    const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    const passwordResetExpires = Date.now() + 3600000;

    existingUser.resetToken = passwordResetToken;
    existingUser.resetTokenExpiry = passwordResetExpires;

    const { headers } = request;
    const host = headers.get('host');
    const protocol = headers.get('x-forwarded-proto') || 'http';

    const resetUrl = `${protocol}://${host}/auth/reset-password/${resetToken}`;

    await existingUser.save();

    return new NextResponse(JSON.stringify({ to_email: email, resetUrl }), { status: 200 });
    
  } catch (error) {

    console.error("Error initiating password reset: ", error);

    return new NextResponse(JSON.stringify({ error: "Failed to initiate password reset." }), { status: 500 });
  }
};
