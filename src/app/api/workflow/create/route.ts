import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";
import { authMiddleware } from "@/middleware/auth.middleware";
import { CommonApiResponse } from "@/interface/common.interface";
import { CreateWorkflowRequest, WorkflowResponse } from "@/interface/workflow.interface";

/**
 * Handler for creating a workflow.
 */
const createWorkflowHandler = async (
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
		const body: CreateWorkflowRequest = await request.json();
		const {
			name,
			banner = '',
			description,
			nodes,
			edges,
			isDraft,
			isPublic,
			sharedWith,
			tags,
			triggerType,
			cronSchedule,
		} = body;

		// Validate required fields
		if (!name) {
			return NextResponse.json(
				{
					message: "Workflow name is required.",
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

		// Create a new workflow
		const createdWorkflow = await prisma.workflow.create({
			data: {
				name,
				banner: banner || null,
				description: description || "",
				nodes: nodes || [],
				edges: edges || [],
				isDraft: isDraft || false,
				isPublic: isPublic || false,
				sharedWith: sharedWith || [],
				tags: tags || [],
				triggerType: triggerType || "MANUAL",
				cronSchedule: cronSchedule || null,
				profile: { connect: { id: userProfile.id } },
			},
		});

		const workflowResponse: WorkflowResponse = {
			id: createdWorkflow.id,
			banner: createdWorkflow.banner,
			name: createdWorkflow.name,
			description: createdWorkflow.description || "",
			nodes: createdWorkflow.nodes,
			edges: createdWorkflow.edges,
			isDraft: createdWorkflow.isDraft,
			isPublic: createdWorkflow.isPublic,
			sharedWith: createdWorkflow.sharedWith,
			tags: createdWorkflow.tags,
			triggerType: createdWorkflow.triggerType,
			cronSchedule: createdWorkflow.cronSchedule,
			createdAt: createdWorkflow.createdAt.toISOString(),
			updatedAt: createdWorkflow.updatedAt.toISOString(),
			profileId: createdWorkflow.profileId,
		};

		const response: CommonApiResponse<WorkflowResponse> = {
			data: workflowResponse,
			meta: null,
			message: "Workflow created successfully.",
			status: 201,
		};

		return NextResponse.json(response, { status: 201 });
	} catch (error) {
		console.error("Error creating workflow:", error);
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

export const POST = authMiddleware(createWorkflowHandler);
