import { NextRequest, NextResponse } from 'next/server';
import DBconnect from '../../../../../lib/db';
import User from '../../../../../lib/Models/User';
import { Types } from 'mongoose';

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { userId } = body;

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return NextResponse.json({ error: 'Valid account ID is required' }, { status: 400 });
        }

        await DBconnect();

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ error: 'Account not found' }, { status: 404 });
        }

        const { password, ...safeUser } = user.toObject();

        return NextResponse.json({ message: 'Account retrieved successfully', user: safeUser });
    } catch (error: any) {
        console.error('Error retrieving user:', error);
        return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
    }
};
