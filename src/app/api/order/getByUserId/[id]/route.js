import { NextResponse } from "next/server";
import Order from "@/models/Order";
import CommonUtil from "@/common/commonUtils";

// Get Order by ID API
export const GET = async (request, { params }) => {
    const { id } = params;

    try {
        await CommonUtil.connectDB();
        const order = await Order.find(
            {
                'userInfo.userId': id
            }
        );
        return new NextResponse(JSON.stringify(order), { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error!", { status: 500 });
    }
};
