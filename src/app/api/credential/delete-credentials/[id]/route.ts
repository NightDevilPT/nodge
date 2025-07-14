import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";
import { authMiddleware } from "@/middleware/auth.middleware";
import { CommonApiResponse } from "@/interface/common.interface";

/**
 * Handler for deleting a credential.
 */
const deleteCredentialHandler = async (
	request: NextRequest,
	{ params }: { params: { id: string } }
): Promise<NextResponse> => {
	try {
		if (request.method !== "DELETE") {
			return NextResponse.json(
				{ message: "Method not allowed", status: 405 },
				{ status: 405 }
			);
		}

		const credentialId = params.id;
		const userId = (request as any).userId; // Authenticated user ID from middleware

		// Get the user's profile
		const userProfile = await prisma.profile.findUnique({
			where: { userId },
		});

		if (!userProfile) {
			return NextResponse.json(
				{
					message:
						"User profile not found. Please create a profile first.",
					status: 404,
				},
				{ status: 404 }
			);
		}

		// Check if the credential exists and belongs to the user
		const existingCredential = await prisma.credential.findFirst({
			where: {
				id: credentialId,
				profileId: userProfile.id,
			},
		});

		if (!existingCredential) {
			return NextResponse.json(
				{
					message: "Credential not found or access denied.",
					status: 404,
				},
				{ status: 404 }
			);
		}

		// Delete the credential
		await prisma.credential.delete({
			where: {
				id: credentialId,
			},
		});

		const response: CommonApiResponse<null> = {
			data: null,
			meta: null,
			message: "Credential deleted successfully.",
			status: 200,
		};

		return NextResponse.json(response, { status: 200 });
	} catch (error) {
		console.error("Error deleting credential:", error);
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

export const DELETE = authMiddleware(deleteCredentialHandler);
