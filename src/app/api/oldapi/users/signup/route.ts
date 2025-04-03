import { connect } from '@/app/dbConfig/dbConfig';
import Admin from '@/models/oldmodels/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

connect();

export async function GET(request: NextRequest) {
    try {
        // Fetch all users from the "Admin" collection
        const users = await Admin.find();

        return NextResponse.json({ users });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { Username, Password } = reqBody;

        // Check if the user already exists
        const existingUser = await Admin.findOne({ Username });

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(Password, salt);

        // Create a new user document
        const newUser = new Admin({
            Username,
            Password: hashedPassword,
            Base64: "",
            DeviceIP:"192.168.1.01",
            Name:"Amrit"

        });
        
        // Save the new user document
        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            savedUser
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
