import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";

export async function POST(request: NextRequest) {
  try {
    // Extract request body
    const { email, otp } = await request.json();

    // Validate required fields
    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP are required." },
        { status: 400 }
      );
    }

    // Find the user by email and otp
    const user = await prisma.user.findUnique({
      where:{
        email,
        otp:Number(otp)
      }
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid OTP or user not found." },
        { status: 404 }
      );
    }

    // Check if OTP has expired
    if (!user.otpExpireAt || user.otpExpireAt < new Date()) {
      return NextResponse.json(
        { message: "OTP has expired. Please request a new verification email." },
        { status: 410 }
      );
    }

    // Update the user's verification status
    await prisma.user.update({
      where: { email: email },
      data: {
        isVerified: true,
        otp: null, // Clear OTP after successful verification
        otpExpireAt: null,
      },
    });

    return NextResponse.json(
      { message: "Email verified successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during verification:", error);
    return NextResponse.json(
      { message: "An internal server error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
