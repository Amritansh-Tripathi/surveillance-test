import { connect } from '@/app/dbConfig/dbConfig';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connect();

    const body = await req.json(); // Parse JSON from the request body
    const { users } = body;

    if (!users || !Array.isArray(users)) {
      return NextResponse.json({ message: 'Invalid data format' }, { status: 400 });
    }

    // Transform and validate data
    const transformedUsers = users.map((user: any) => ({
      name: user.name || null,
      email: user.email || null,
      phone: user.phone || null,
      department: user.department || null,
      age: typeof user.age === 'number' ? user.age : null,
      role: user.role || null,
      status: typeof user.status === 'boolean' ? user.status : true,
      profilePic: user.profilePic || null, // Include profile picture
    }));

    // Validate required fields (e.g., email and phone)
    const validUsers = transformedUsers.filter(
      (user) => user.email && user.phone
    );

    if (validUsers.length === 0) {
      return NextResponse.json({ message: 'No valid users to save' }, { status: 400 });
    }

    // Save users to the database
    const result = await User.insertMany(validUsers);

    return NextResponse.json({
      message: 'Users saved successfully',
      savedCount: result.length,
    });
  } catch (error) {
    console.error('Error saving users:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
