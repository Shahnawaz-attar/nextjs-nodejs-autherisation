import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();

    const { token } = requestBody;
    console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid user' }, { status: 400 });
    }
    if (user.isVerified) {
      return NextResponse.json(
        { message: 'You already verified user', code: 'already' },
        { status: 200 },
      );
    }

    console.log(user, 'user');

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { message: 'Email is verified', status: true },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 5000 });
  }
}
