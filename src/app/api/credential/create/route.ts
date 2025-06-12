import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";
import { authMiddleware } from "@/middleware/auth.middleware";
import { CommonApiResponse } from "@/interface/common.interface";
import {
	CreateCredentialRequest,
	CredentialResponse,
} from "@/interface/credential.interface";

/**
 * Handler for creating a credential.
 */
const createCredentialHandler = async (
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
		const body: CreateCredentialRequest = await request.json();
		const { credentialType, credentialsValue } = body;

		// Validate required fields
		if (!credentialType) {
			return NextResponse.json(
				{
					message: "Credential type is required.",
					status: 400,
				},
				{ status: 400 }
			);
		}

		if (!credentialsValue) {
			return NextResponse.json(
				{
					message: "Credentials value is required.",
					status: 400,
				},
				{ status: 400 }
			);
		}

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

		// Create a new credential
		const createdCredential = await prisma.credential.create({
			data: {
				credentialType,
				credentialsValue,
				profile: { connect: { id: userProfile.id } },
			},
		});

		const credentialResponse: CredentialResponse = {
			id: createdCredential.id,
			credentialType: createdCredential.credentialType,
			credentialsValue: createdCredential.credentialsValue,
			createdAt: createdCredential.createdAt.toISOString(),
			updatedAt: createdCredential.updatedAt.toISOString(),
			profileId: createdCredential.profileId,
		};

		const response: CommonApiResponse<CredentialResponse> = {
			data: credentialResponse,
			meta: null,
			message: "Credential created successfully.",
			status: 201,
		};

		return NextResponse.json(response, { status: 201 });
	} catch (error) {
		console.error("Error creating credential:", error);
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

export const POST = authMiddleware(createCredentialHandler);
