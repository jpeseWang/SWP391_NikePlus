import { NextResponse } from "next/server";
import CommonUtil from "@/common/commonUtils";
import Auction from "@/models/Auction";

export const GET = async () => {
  try {
    await CommonUtil.connectDB();
    const posts = await Auction.find();
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const body = await request.json();

  const newBid = new Auction(body);

  try {
    await CommonUtil.connectDB();
    await newBid.save();

    return new NextResponse("Auction has been created", { status: 201 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
