import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";
import { authMiddleware } from "@/middleware/auth.middleware";
import { CommonApiResponse } from "@/interface/common.interface";
import { WorkflowResponse } from "@/interface/workflow.interface";

/**
 * Handler for getting a single workflow by ID
 */
const getWorkflowByIdHandler = async (
	request: NextRequest,
	{ params }: { params: { id: string } }
): Promise<NextResponse> => {
	try {
		if (request.method !== "GET") {
			return NextResponse.json(
				{ message: "Method not allowed", status: 405 },
				{ status: 405 }
			);
		}

		const userId = (request as any).userId; // Authenticated user ID from middleware
		const workflowId = params.id;

		// First verify the user has access to this workflow
		const userProfile = await prisma.profile.findUnique({
			where: { userId },
			select: { id: true },
		});

		if (!userProfile) {
			return NextResponse.json(
				{ message: "User profile not found", status: 404 },
				{ status: 404 }
			);
		}

		// Get the workflow with owner and sharedWith information
		const workflow = await prisma.workflow.findFirst({
			where: {
				id: workflowId,
				OR: [
					{ profileId: userProfile.id }, // User is the owner
					{ sharedWith: { has: userProfile.id } }, // Or workflow is shared with user
				],
			},
			include: {
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
		});

		if (!workflow) {
			return NextResponse.json(
				{ message: "Workflow not found or access denied", status: 404 },
				{ status: 404 }
			);
		}

		// Format the response
		const workflowResponse: WorkflowResponse = {
			id: workflow.id,
			banner: workflow.banner || "",
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
			profileId: workflow.profileId,
			sharedWith: workflow.sharedWith || [],
			cronSchedule: workflow.cronSchedule || null,
			user: {
				email: workflow.profile.user.email,
				firstName: workflow.profile.firstName,
				lastName: workflow.profile.lastName,
			},
		};

		const response: CommonApiResponse<WorkflowResponse> = {
			data: workflowResponse,
			meta: null,
			message: "Workflow retrieved successfully",
			status: 200,
		};

		return NextResponse.json(response, { status: 200 });
	} catch (error) {
		console.error("Error getting workflow:", error);
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

export const GET = authMiddleware(getWorkflowByIdHandler);
