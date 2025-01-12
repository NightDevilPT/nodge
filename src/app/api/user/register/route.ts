import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma-client";
import { config } from "@/components/config";
import { generateOtp } from "@/lib/generate-otp";
import { CreateUserRequest } from "@/interface/user.interface";
import { getOtpEmailTemplate } from "@/templates/otp-mail.template";
import { emailProviderFactory } from "@/services/email-provider.service";

export async function POST(request: NextRequest) {
	try {
		// Extract request body
		const { username, email, password, provider } =
			(await request.json()) as CreateUserRequest;

		// Validate required fields
		if (!username || !email || !password || !provider) {
			return NextResponse.json(
				{ message: "All fields are required." },
				{ status: 400 }
			);
		}

		// Check if user already exists
		const existingUser = await prisma.user.findUnique({ where: { email } });
		if (existingUser) {
			return NextResponse.json(
				{ message: "An account with this email already exists." },
				{ status: 409 }
			);
		}

		// Hash the password securely
		const hashedPassword = await bcrypt.hash(password, 10);
		const otp = generateOtp(); // Generate OTP for email verification
		const currentYear = new Date().getFullYear().toString();

		// Create the new user record in the database
		await prisma.user.create({
			data: {
				username,
				email,
				password: hashedPassword,
				provider,
				otp,
				otpExpireAt: new Date(Date.now() + 10 * 60 * 1000), // OTP expires in 10 minutes
			},
		});

		// Configure email transporter for sending verification email
		const transporter = emailProviderFactory("gmail");
		const emailOptions = {
			from: config.emailId,
			to: email,
			subject: "Email Verification",
			html: getOtpEmailTemplate(username, otp, currentYear),
		};

		// Send verification email
		await transporter.sendMail(emailOptions);

		return NextResponse.json(
			{
				message:
					"User created successfully. A verification email has been sent.",
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error in user registration:", error);
		return NextResponse.json(
			{
				message:
					"An internal server error occurred. Please try again later.",
			},
			{ status: 500 }
		);
	}
}
