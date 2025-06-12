import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";
import { authMiddleware } from "@/middleware/auth.middleware";
import { CommonApiResponse, MetaInfo } from "@/interface/common.interface";

// Query interface for credentials
interface GetCredentialsQuery {
	page: string;
	limit: string;
	search: string;
	sortBy: string;
	sortOrder: string;
	credentialType?: string;
}

// Response interface for credentials
interface CredentialResponse {
	id: string;
	credentialType: string;
	credentialsValue: any;
	createdAt: string;
	updatedAt: string;
	profileId: string;
	user: {
		email: string;
		firstName: string;
		lastName: string;
	};
}

/**
 * Handler for getting all credentials for a particular user.
 */
const getCredentialsHandler = async (
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
		const url = new URL(request.url);

		// Parse query parameters
		const query: GetCredentialsQuery = {
			page: url.searchParams.get("page") || "1",
			limit: url.searchParams.get("limit") || "10",
			search: url.searchParams.get("search") || "",
			sortBy: url.searchParams.get("sortBy") || "createdAt",
			sortOrder: url.searchParams.get("sortOrder") || "desc",
			credentialType: url.searchParams.get("credentialType") || undefined,
		};

		// Convert query params to appropriate types
		const page = parseInt(query.page as string) || 1;
		const limit = parseInt(query.limit as string) || 10;
		const skip = (page - 1) * limit;
		const search = query.search;

		// Get the user's profile
		const userProfile = await prisma.profile.findUnique({
			where: { userId },
		});

		if (!userProfile) {
			return NextResponse.json(
				{
					message: "User profile not found.",
					status: 404,
				},
				{ status: 404 }
			);
		}

		// Build filter conditions
		const filterConditions: any = {
			profileId: userProfile.id,
		};

		// Add search filter if provided
		if (search) {
			filterConditions.OR = [
				{ credentialType: { contains: search, mode: "insensitive" } },
			];
		}

		// Add credentialType filter if provided
		if (query.credentialType) {
			filterConditions.credentialType = {
				contains: query.credentialType,
				mode: "insensitive",
			};
		}

		// Get total count for pagination
		const totalCredentials = await prisma.credential.count({
			where: filterConditions,
		});

		// Sort configuration
		const sortField = ["credentialType", "createdAt", "updatedAt"].includes(
			query.sortBy as string
		)
			? query.sortBy
			: "createdAt";

		const sortOrder = query.sortOrder === "asc" ? "asc" : "desc";

		const sortConfig: any = {
			[sortField as string]: sortOrder,
		};

		// Query credentials
		const credentials = await prisma.credential.findMany({
			where: filterConditions,
			select: {
				id: true,
				credentialType: true,
				credentialsValue: true,
				createdAt: true,
				updatedAt: true,
				profileId: true,
				profile: {
					select: {
						firstName: true,
						lastName: true,
						user: {
							select: {
								email: true,
							},
						},
					},
				},
			},
			orderBy: sortConfig,
			skip,
			take: limit,
		});

		// Format response
		const credentialsResponse: CredentialResponse[] = credentials.map(
			(credential) => ({
				id: credential.id,
				credentialType: credential.credentialType,
				credentialsValue: credential.credentialsValue,
				createdAt: credential.createdAt.toISOString(),
				updatedAt: credential.updatedAt.toISOString(),
				profileId: credential.profileId,
				user: {
					email: credential.profile.user.email,
					firstName: credential.profile.firstName,
					lastName: credential.profile.lastName,
				},
			})
		);

		// Prepare pagination metadata
		const meta: MetaInfo = {
			totalPages: Math.ceil(totalCredentials / limit),
			currentPage: page,
			isPrevious: page > 1,
			isNext: page * limit < totalCredentials,
			totalItems: totalCredentials,
			itemsPerPage: limit,
		};

		const response: CommonApiResponse<CredentialResponse[]> = {
			data: credentialsResponse,
			meta,
			message: "Credentials retrieved successfully.",
			status: 200,
		};

		return NextResponse.json(response, { status: 200 });
	} catch (error) {
		console.error("Error getting credentials:", error);
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

export const GET = authMiddleware(getCredentialsHandler);
