import { NextRequest, NextResponse } from "next/server";

import {
	UpdateProfileRequest,
	ProfileResponse,
} from "@/interface/profile.interface";
import prisma from "@/lib/prisma-client";
import { authMiddleware } from "@/middleware/auth.middleware";
import { CommonApiResponse } from "@/interface/common.interface";

/**
 * Handler to update the authenticated user's profile.
 */
const updateProfileHandler = async (
	request: NextRequest
): Promise<NextResponse> => {
	try {
		const userId = (request as any).userId; // Authenticated user ID from middleware
		const body: UpdateProfileRequest = await request.json();
		const { firstName, lastName, phoneNumber, avatar, gender } = body;

		// Check if the profile exists
		const existingProfile = await prisma.profile.findUnique({
			where: { userId },
		});
		if (!existingProfile) {
			return NextResponse.json(
				{
					data: null,
					meta: null,
					message: "Profile not found.",
					status: 404,
				},
				{ status: 404 }
			);
		}

		// Update the profile
		const updatedProfile = await prisma.profile.update({
			where: { userId },
			data: {
				firstName: firstName ?? existingProfile.firstName,
				lastName: lastName ?? existingProfile.lastName,
				phoneNumber: phoneNumber ?? existingProfile.phoneNumber,
				avatar: avatar ?? existingProfile.avatar,
				gender: gender ?? existingProfile?.gender as any
			},
		});

		const profileResponse: ProfileResponse["profile"] = {
			id: updatedProfile.id,
			firstName: updatedProfile.firstName,
			lastName: updatedProfile.lastName,
			phoneNumber: updatedProfile.phoneNumber || "",
			avatar: updatedProfile.avatar || "",
			createdAt: updatedProfile.createdAt.toISOString(),
			updatedAt: updatedProfile.updatedAt.toISOString(),
			userId: updatedProfile.userId,
		};

		const response: CommonApiResponse<ProfileResponse["profile"]> = {
			data: profileResponse,
			meta: null,
			message: "Profile updated successfully.",
			status: 200,
		};

		return NextResponse.json(response, { status: 200 });
	} catch (error) {
		console.error("Error updating profile:", error);
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

export const PUT = authMiddleware(updateProfileHandler);
