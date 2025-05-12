import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";
import { authMiddleware } from "@/middleware/auth.middleware";
import { CommonApiResponse, MetaInfo } from "@/interface/common.interface";
import {
	GetWorkflowsQuery,
	WorkflowResponse,
} from "@/interface/workflow.interface";

/**
 * Handler for getting all workflows for a particular user.
 */
const getWorkflowsHandler = async (
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
		const query: GetWorkflowsQuery = {
			page: url.searchParams.get("page") || "1",
			limit: url.searchParams.get("limit") || "10",
			search: url.searchParams.get("search") || "",
			sortBy: url.searchParams.get("sortBy") || "createdAt",
			sortOrder: url.searchParams.get("sortOrder") || "desc",
			isDraft: url.searchParams.get("isDraft") || undefined,
			isPublic: url.searchParams.get("isPublic") || undefined,
			tags: url.searchParams.get("tags") || undefined,
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
				{ name: { contains: search, mode: "insensitive" } },
				{ description: { contains: search, mode: "insensitive" } },
			];
		}

		// Add isDraft filter if provided
		if (query.isDraft !== undefined) {
			filterConditions.isDraft = query.isDraft === "true";
		}

		// Add isPublic filter if provided
		if (query.isPublic !== undefined) {
			filterConditions.isPublic = query.isPublic === "true";
		}

		// Add tags filter if provided
		if (query.tags) {
			const tagsList = query.tags.split(",");
			filterConditions.tags = { hasSome: tagsList };
		}

		// Get total count for pagination
		const totalWorkflows = await prisma.workflow.count({
			where: filterConditions,
		});

		// Sort configuration
		const sortField = ["name", "createdAt", "updatedAt"].includes(
			query.sortBy as string
		)
			? query.sortBy
			: "createdAt";

		const sortOrder = query.sortOrder === "asc" ? "asc" : "desc";

		const sortConfig: any = {
			[sortField as string]: sortOrder,
		};

		// Query workflows
		const workflows = await prisma.workflow.findMany({
			where: filterConditions,
			select: {
				id: true,
				banner: true,
				name: true,
				description: true,
				nodes: true,
				edges: true,
				isDraft: true,
				isPublic: true,
				tags: true,
				triggerType: true,
				createdAt: true,
				updatedAt: true,
				sharedWith: true,
				cronSchedule: true,
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
		const workflowsResponse: WorkflowResponse[] = workflows.map(
			(workflow) => ({
				id: workflow.id,
				banner: workflow.banner,
				name: workflow.name,
				description: workflow.description || "",
				nodes: workflow.nodes || [],
				edges: workflow.edges || [],
				isDraft: workflow.isDraft,
				isPublic: workflow.isPublic,
				tags: workflow.tags,
				triggerType: workflow.triggerType,
				createdAt: workflow.createdAt.toISOString(),
				updatedAt: workflow.updatedAt.toISOString(),
				profileId: userProfile.id,
				sharedWith: workflow.sharedWith || [],
				cronSchedule: workflow.cronSchedule || null,
        user:{
          email: workflow.profile.user.email,
          firstName: workflow.profile.firstName,
          lastName: workflow.profile.lastName,
        }
			})
		);

		// Prepare pagination metadata
		const meta: MetaInfo = {
			totalPages: Math.ceil(totalWorkflows / limit),
			currentPage: page,
			isPrevious: page > 1,
			isNext: page * limit < totalWorkflows,
			totalItems: totalWorkflows,
			itemsPerPage: limit,
		};

		const response: CommonApiResponse<WorkflowResponse[]> = {
			data: workflowsResponse,
			meta,
			message: "Workflows retrieved successfully.",
			status: 200,
		};

		return NextResponse.json(response, { status: 200 });
	} catch (error) {
		console.error("Error getting workflows:", error);
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

export const GET = authMiddleware(getWorkflowsHandler);
