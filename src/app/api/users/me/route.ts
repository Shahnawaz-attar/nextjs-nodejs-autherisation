import { connect } from '@/dbConfig/dbConfig';
import { getDataByToken } from '@/helpers/getDataByToken';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request: NextRequest) {
  try {
    const { id }: any = await getDataByToken(request);

    const userData = await User.findOne({ _id: id }).select('-password');

    return NextResponse.json({ message: 'User data', userData });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
