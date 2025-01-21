import { NextRequest, NextResponse } from "next/server";
import Cart from "../../../../../lib/Models/Cart";
import connectDb from "../../../../../lib/db";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { userId } = body;

        if (!userId) return NextResponse.json({ message: "User id is required" }, { status: 400 });

        await connectDb();
        const cart = await Cart.find({ userId }).populate("productId");

        return NextResponse.json(cart, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Failed to fetch cart ", error: error.message }, { status: 500 });
    }
};