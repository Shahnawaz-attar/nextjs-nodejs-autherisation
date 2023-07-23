import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const getDataByToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get('token')?.value || '';
    const data = jwt.verify(token, process.env.TOKEN_SECRET!);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
