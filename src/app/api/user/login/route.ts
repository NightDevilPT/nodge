import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";
import jwtService from "@/services/jwt.service";

export async function POST(request: NextRequest) {
	try {
		const { email, password } = await request.json();

		// Validate email and password
		if (!email || !password) {
			return NextResponse.json(
				{ message: "Email and password are required.", status: 400 },
				{ status: 400 }
			);
		}

		// Check if user exists
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			return NextResponse.json(
				{ message: "Invalid email or password.", status: 401 },
				{ status: 401 }
			);
		}

		// Check if user is verified
		if (!user.isVerified) {
			return NextResponse.json(
				{
					message: "Please verify your email before logging in.",
					status: 403,
				},
				{ status: 403 }
			);
		}

		// Compare passwords
		const isPasswordValid = await bcrypt.compare(
			password,
			user.password || ""
		);
		if (!isPasswordValid) {
			return NextResponse.json(
				{ message: "Invalid email or password.", status: 401 },
				{ status: 401 }
			);
		}

		// Generate tokens using jwtService
		const tokens = jwtService.generateToken({
			userId: user.id,
			email: user.email,
		});

		// Store refreshToken in the database
		await prisma.user.update({
			where: { id: user.id },
			data: { refreshToken: tokens.refreshToken },
		});

		// Set secure cookies
		const response = NextResponse.json(
			{ message: "Login successful.", status: 200 },
			{ status: 200 }
		);

		response.cookies.set("accessToken", tokens.accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 15 * 60, // 15 minutes
			path: "/",
		});

		response.cookies.set("refreshToken", tokens.refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 20 * 60, // 20 minutes
			path: "/",
		});

		return response;
	} catch (error) {
		console.error("Login error:", error);
		return NextResponse.json(
			{
				message: "Internal server error. Please try again later.",
				status: 500,
			},
			{ status: 500 }
		);
	}
}
