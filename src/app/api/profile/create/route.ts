import { NextRequest, NextResponse } from "next/server";

import {
	CreateProfileRequest,
	ProfileResponse,
} from "@/interface/profile.interface";
import prisma from "@/lib/prisma-client";
import { authMiddleware } from "@/middleware/auth.middleware";
import { CommonApiResponse } from "@/interface/common.interface";

/**
 * Handler for creating a user profile.
 */
const createProfileHandler = async (
	request: NextRequest
): Promise<NextResponse> => {
	try {
		if (request.method !== "POST") {
			return NextResponse.json(
				{ message: "Method not allowed", status: 405 },
				{ status: 405 }
			);
		}

		// Parse and validate the request body
		const body: CreateProfileRequest = await request.json();
		const { firstName, lastName, phoneNumber, avatar } = body;

		if (!firstName || !lastName) {
			return NextResponse.json(
				{
					message: "First name and last name are required.",
					status: 400,
				},
				{ status: 400 }
			);
		}

		const userId = (request as any).userId; // Authenticated user ID from middleware

		// Check if the profile already exists for the user
		const existingProfile = await prisma.profile.findUnique({
			where: { userId },
		});
		if (existingProfile) {
			return NextResponse.json(
				{
					message: "A profile already exists for this user.",
					status: 409,
				},
				{ status: 409 }
			);
		}

		// Create a new profile for the user
		const createdProfile = await prisma.profile.create({
			data: {
				firstName,
				lastName,
				phoneNumber,
				avatar,
				user: { connect: { id: userId } },
			},
		});

		const profileResponse: ProfileResponse = {
			profile: {
				id: createdProfile.id,
				firstName: createdProfile.firstName,
				lastName: createdProfile.lastName,
				phoneNumber: createdProfile.phoneNumber || "",
				avatar: createdProfile.avatar || "",
				createdAt: createdProfile.createdAt.toISOString(),
				updatedAt: createdProfile.updatedAt.toISOString(),
				userId: createdProfile.userId,
			},
		};

		const response: CommonApiResponse<ProfileResponse["profile"]> = {
			data: profileResponse.profile,
			meta: null,
			message: "Profile created successfully.",
			status: 201,
		};

		return NextResponse.json(response, { status: 201 });
	} catch (error) {
		console.error("Error creating profile:", error);
		return NextResponse.json(
			{
				data: null,
				meta: null,
				message:
					"An internal server error occurred. Please try again later.",
				status: 500,
			},
			{ status: 500 }
		);
	}
};

export const POST = authMiddleware(createProfileHandler);
