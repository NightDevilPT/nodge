import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";
import { authMiddleware } from "@/middleware/auth.middleware";
import { CommonApiResponse } from "@/interface/common.interface";
import {
	CreateCredentialRequest,
	CredentialResponse,
	CredentialType,
} from "@/interface/credential.interface";

/**
 * Handler for updating a credential.
 */
const updateCredentialHandler = async (
	request: NextRequest,
	{ params }: { params: { id: string } }
): Promise<NextResponse> => {
	try {
		if (request.method !== "PUT") {
			return NextResponse.json(
				{ message: "Method not allowed", status: 405 },
				{ status: 405 }
			);
		}

		const credentialId = params.id;
		const userId = (request as any).userId; // Authenticated user ID from middleware

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

		// Update the credential
		const updatedCredential = await prisma.credential.update({
			where: {
				id: credentialId,
			},
			data: {
				credentialType,
				credentialsValue,
			},
		});

		const credentialResponse: CredentialResponse = {
			id: updatedCredential.id,
			credentialType: updatedCredential.credentialType as CredentialType,
			credentialsValue: updatedCredential.credentialsValue as any,
			createdAt: updatedCredential.createdAt.toISOString(),
			updatedAt: updatedCredential.updatedAt.toISOString(),
			profileId: updatedCredential.profileId,
		};

		const response: CommonApiResponse<CredentialResponse> = {
			data: credentialResponse,
			meta: null,
			message: "Credential updated successfully.",
			status: 200,
		};

		return NextResponse.json(response, { status: 200 });
	} catch (error) {
		console.error("Error updating credential:", error);
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

export const PUT = authMiddleware(updateCredentialHandler);
