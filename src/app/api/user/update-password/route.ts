import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		// Extract request body
		const { email, otp, newPassword } = await request.json();

		// Validate required fields
		if (!email || !otp || !newPassword) {
			return NextResponse.json(
				{ message: "Email, OTP, and new password are required." },
				{ status: 400 }
			);
		}

		// Find the user by email
		const user = await prisma.user.findFirst({
			where: {
				email,
				otp: Number(otp),
			},
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
				{ message: "OTP has expired. Please request a new OTP." },
				{ status: 410 }
			);
		}

		// Hash the new password
		const hashedPassword = await bcrypt.hash(newPassword, 10);

		// Update the password and clear OTP fields
		await prisma.user.update({
			where: { email },
			data: {
				password: hashedPassword,
				otp: null, // Clear OTP after successful update
				otpExpireAt: null,
			},
		});

		return NextResponse.json(
			{ message: "Password updated successfully." },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error in updating password:", error);
		return NextResponse.json(
			{
				message:
					"An internal server error occurred. Please try again later.",
			},
			{ status: 500 }
		);
	}
}
