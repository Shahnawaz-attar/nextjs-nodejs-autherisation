import { NextResponse } from 'next/server';

export async function GET(req: any) {
  try {
    const response = NextResponse.json({
      message: 'Logout successfuk',
      status: true,
    });

    response.cookies.set('token', '', { expires: new Date(0) });
    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 5000 });
  }
}
