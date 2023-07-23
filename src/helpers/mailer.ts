import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import { NextResponse } from 'next/server';

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    let emailSubject;
    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
      emailSubject = 'Please verify you email';
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
      emailSubject = 'Reset you email';
    }
    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '9645153680abb2',
        pass: '611cfdb52f8beb',
      },
    });

    const mailOption = {
      from: 'shahnawazattar55@gmail.com',
      to: email,
      subject: emailSubject,
      html: `<p>Click  <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Here</a> to ${emailSubject}`,
    };

    const mailResponse = await transporter.sendMail(mailOption);

    return mailResponse;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
