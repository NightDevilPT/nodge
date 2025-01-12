import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma-client";
import { config } from "@/components/config";
import { emailProviderFactory } from "@/services/email-provider.service";
import { getOtpEmailTemplate } from "@/templates/otp-mail.template";
import { generateOtp } from "@/lib/generate-otp";


export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email field
    if (!email) {
      return NextResponse.json(
        { message: "Email is required." },
        { status: 400 }
      );
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { message: "User with this email does not exist." },
        { status: 404 }
      );
    }

    // Generate a new OTP and expiration time
    const otp = generateOtp();
    const otpExpireAt = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    // Update the OTP and expiry time in the database
    await prisma.user.update({
      where: { email },
      data: {
        otp,
        otpExpireAt,
      },
    });

    // Configure email transporter and send the OTP email
    const transporter = emailProviderFactory("gmail");
    const emailOptions = {
      from: config.emailId,
      to: email,
      subject: "Password Reset OTP",
      html: getOtpEmailTemplate(user.username, otp, new Date().getFullYear().toString()),
    };

    await transporter.sendMail(emailOptions);

    return NextResponse.json(
      { message: "Password reset OTP has been sent to your email." },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error in forgot password:", error);
    return NextResponse.json(
      { message: "An internal server error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
