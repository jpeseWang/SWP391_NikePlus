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
            return new NextResponse("User not found", { status: 404 });
        }

        return new NextResponse("User has been updated", { status: 200 });
    } catch (err) {
        return new NextResponse("Database error", { status: 500 });
    }
};