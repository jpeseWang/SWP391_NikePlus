import { NextResponse } from "next/server";
import User from '@/models/User';
import CommonUtil from "@/common/commonUtils";
import bcrypt from 'bcryptjs';

export const PATCH = async (request, { params }) => {
    const { id } = params;
    const { currentPassword, newPassword } = await request.json();

    try {
        await CommonUtil.connectDB();
        const user = await User.findById(id);

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return new NextResponse("Current password is not matched.", { status: 400 });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 5);
        user.password = hashedNewPassword;
        await user.save();

        return new NextResponse(JSON.stringify({ message: "Password has been changed." }), { status: 200 });
    } catch (err) {
        return new NextResponse("Database error", { status: 500 });
    }
};