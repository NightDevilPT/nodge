import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma-client";
import { ProfileResponse } from "@/interface/profile.interface";
import { authMiddleware } from "@/middleware/auth.middleware";
import { CommonApiResponse } from "@/interface/common.interface";

/**
 * Handler for retrieving the authenticated user's profile.
 */
const getProfileHandler = async (
	request: NextRequest
): Promise<NextResponse> => {
	try {
		if (request.method !== "GET") {
			return NextResponse.json(
				{ message: "Method not allowed", status: 405 },
				{ status: 405 }
			);
		}

		const userId = (request as any).userId; // Authenticated user ID from middleware

		// Retrieve the profile associated with the user ID
		const profile = await prisma.profile.findUnique({
			where: { userId },
			select: {
				id: true,
				firstName: true,
				lastName: true,
				phoneNumber: true,
				avatar: true,
				createdAt: true,
				updatedAt: true,
				userId: true,
				user: {
					select: {
						id: true,
						isVerified: true,
					}
				}
			}
		});

		if (!profile) {
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

		const profileData: ProfileResponse["profile"] = {
			id: profile.id,
			firstName: profile.firstName,
			lastName: profile.lastName,
			phoneNumber: profile.phoneNumber || "",
			avatar: profile.avatar || "",
			createdAt: profile.createdAt.toISOString(),
			updatedAt: profile.updatedAt.toISOString(),
			userId: profile.userId,
			verified: profile.user.isVerified,
		};

		const response: CommonApiResponse<ProfileResponse["profile"]> = {
			data: profileData,
			meta: null,
			message: "Profile retrieved successfully.",
			status: 200,
		};

		return NextResponse.json(response, { status: 200 });
	} catch (error) {
		console.error("Error retrieving profile:", error);
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

export const GET = authMiddleware(getProfileHandler);
