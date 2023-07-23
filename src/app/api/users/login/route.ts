import { connect } from '@/dbConfig/dbConfig';
import Users from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();
    const { email, password } = response;

    const user = await Users.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: 'User Not Found', status: 'NOT_FOUND' },
        { status: 200 },
      );
    }

    const passmatch = await bcryptjs.compare(password, user.password);

    if (!passmatch) {
      return NextResponse.json(
        { message: 'Password wrong', status: 'WRONG_PASS' },
        { status: 200 },
      );
    }

    // create tokenData

    const tokenData = {
      id: user._id,
      username: user.username,
    };

    // create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: '1d',
    });

    const responseNext = NextResponse.json({
      message: 'Login successful',
      success: true,
    });

    responseNext.cookies.set('token', token, { httpOnly: true });
    return responseNext;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    );
  }
}
