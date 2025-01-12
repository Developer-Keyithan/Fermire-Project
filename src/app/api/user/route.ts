import { NextRequest, NextResponse } from 'next/server';
import DBconnect from '../../../../lib/db';
import User from '../../../../lib/Models/User';
import { Types } from 'mongoose';
import bcrypt from 'bcrypt';

export const POST = async (req: Request) => {
    try {
        await DBconnect();

        const { firstName, lastName, mobileNumber, email, confirmPassword, userType } = await req.json();

        const password = confirmPassword;

        const newUser = { firstName, lastName, mobileNumber, email, password, userType };

        const existingUser = await User.findOne({ $or: [{ email }, { mobileNumber }] });

        if (existingUser) {
            return NextResponse.json(
                { error: "Account already exist! Please login." },
                { status: 401 }
            );
        }

        await User.create(newUser);

        return NextResponse.json({ message: "User account successfully created!" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: "Sorry! Failed to create user account." },
            { status: 500 }
        );
    }
};

export const PUT = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { 
            userId, 
            newFirstName, 
            newLastName, 
            newEmail, 
            newMobileNumber, 
            newPassword, 
            newUserType, 
            newProfileName, 
            newFavProduct, 
            newFavReview 
        } = body;

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return NextResponse.json({ error: 'Valid User ID is required' }, { status: 400 });
        }

        const data: Record<string, any> = {};
        if (newFirstName) data.firstName = newFirstName;
        if (newLastName) data.lastName = newLastName;
        if (newEmail) {
            if (!/\S+@\S+\.\S+/.test(newEmail)) {
                return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
            }
            data.email = newEmail;
        }
        if (newMobileNumber) data.mobileNumber = newMobileNumber;
        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            data.password = hashedPassword;
        }
        if (newUserType) data.userType = newUserType;
        if (newProfileName) data.profileName = newProfileName;
        if (newFavProduct) data.favProduct = newFavProduct;
        if (newFavReview) data.favReview = newFavReview;

        if (Object.keys(data).length === 0) {
            return NextResponse.json({ error: 'No fields provided for update' }, { status: 400 });
        }

        await DBconnect();

        const updatedUser = await User.findByIdAndUpdate(
            {_id: userId},
            { $set: data },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Update successful', user: updatedUser });
    } catch (error: any) {
        console.error('Error updating user:', error);
        return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
    }
};

export const GET = async () => {
    try {
        await DBconnect();
        const users = await User.find();

        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch all users data." }, { status: 500 });
    }
};

export const DELETE = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { userId } = body;

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return NextResponse.json({ error: 'Valid User ID is required' }, { status: 400 });
        }

        await DBconnect();

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return NextResponse.json({ error: 'Account not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Account deleted', user: deletedUser });
    } catch (error: any) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
    }
};