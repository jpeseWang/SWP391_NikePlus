import { NextResponse } from "next/server";
import User from "@/models/User";
import CommonUtil from "@/common/commonUtils";

export const PATCH = async (request, { params }) => {
    const { id } = params;
    const updatedFields = await request.json();

    console.log("Received updated fields:", updatedFields);
    console.log("ID:", id);

    try {
        await CommonUtil.connectDB();
        const user = await User.findByIdAndUpdate(id, { $set: updatedFields }, { new: true });

        if (!user) {
            return new NextResponse(JSON.stringify({ error: "User not found" }), { status: 404 });
        }
        return new NextResponse(JSON.stringify({ message: "User has been updated" }), { status: 200 });
    } catch (err) {
        console.error("Database error:", err);
        return new NextResponse(JSON.stringify({ error: "Database error" }), { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    const { id } = params;
    try {
      await CommonUtil.connectDB();
      await User.findByIdAndDelete(id);
      return new NextResponse("User has been deleted", { status: 200 });
    } catch (err) {
      return new NextResponse("Database Error!", { status: 500 });
    }
  };