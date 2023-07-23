import { connect } from '@/dbConfig/dbConfig';
import Users from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendMail } from '@/helpers/mailer';

connect();

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();
    const { username, email, password } = response;
    console.log(response);

    // check USer is already exist or not
    const user = await Users.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: 'user already exist' },
        { status: 400 },
      );
    }

    // hashPassword
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = new Users({
      username,
      email,
      password: hashPassword,
    });
    const result = await newUser.save();

    // send verification email

    await sendMail({ email, emailType: 'VERIFY', userId: result._id });

    return NextResponse.json(
      { message: 'User is successfully created', status: true },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: 'gadbad' }, { status: 500 });
  }
}
