import User from "@/models/User";
import CommonUtil from "@/common/commonUtils";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const {
    name,
    email,
    password,
    role,
    dob,
    country,
    gender } = await request.json();

  await CommonUtil.connectDB();

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
    dob,
    country,
    gender
  });

  try {
    await newUser.save();
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
