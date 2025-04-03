import { connect } from '@/app/dbConfig/dbConfig';
import Admin from '@/models/oldmodels/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { Username, Password } = reqBody;

        // Find the user by username
        const user = await Admin.findOne({ Username });

        if (!user) {
            return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcryptjs.compare(Password, user.Password);

        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, Username: user.Username },
            process.env.TOKEN_SECRET!,
            { expiresIn: '1h' }
        );

        // Send a successful response with the token
        return NextResponse.json({ message: 'Login successful', token });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
