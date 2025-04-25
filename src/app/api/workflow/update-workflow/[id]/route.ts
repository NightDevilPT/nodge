import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";
import { authMiddleware } from "@/middleware/auth.middleware";
import { CommonApiResponse } from "@/interface/common.interface";
import { CreateWorkflowRequest, WorkflowResponse } from "@/interface/workflow.interface";

/**
 * Handler for updating a workflow.
 */
const updateWorkflowHandler = async (
  request: NextRequest
): Promise<NextResponse> => {
  try {
    if (request.method !== "PUT") {
      return NextResponse.json(
        { message: "Method not allowed", status: 405 },
        { status: 405 }
      );
    }

    // Parse and validate the request body
    const body: CreateWorkflowRequest = await request.json();
    const {
      name,
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
	console.log(body, "body");

    // Extract workflow ID from URL
    const pathParts = request.nextUrl.pathname.split('/');
    const workflowId = pathParts[pathParts.length - 1];

    if (!workflowId) {
      return NextResponse.json(
        {
          message: "Workflow ID is required.",
          status: 400,
        },
        { status: 400 }
      );
    }

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

    // Verify the workflow exists and belongs to the user
    const existingWorkflow = await prisma.workflow.findFirst({
      where: {
        id: workflowId,
        profile: { userId }
      },
      include: {
        profile: true
      }
    });

    if (!existingWorkflow) {
      return NextResponse.json(
        {
          message: "Workflow not found or you don't have permission to edit it.",
          status: 404,
        },
        { status: 404 }
      );
    }

    // Update the workflow
    const updatedWorkflow = await prisma.workflow.update({
      where: { id: workflowId },
      data: {
        name: name || existingWorkflow.name,
        description: description || existingWorkflow.description,
        nodes: nodes || existingWorkflow.nodes,
        edges: edges || existingWorkflow.edges,
        isDraft: isDraft,
        isPublic: isPublic,
        sharedWith: sharedWith || existingWorkflow.sharedWith,
        tags: tags || existingWorkflow.tags,
        triggerType: triggerType || existingWorkflow.triggerType,
        cronSchedule: cronSchedule || existingWorkflow.cronSchedule,
      },
    });

    const workflowResponse: WorkflowResponse = {
      id: updatedWorkflow.id,
      name: updatedWorkflow.name,
      description: updatedWorkflow.description || "",
      nodes: updatedWorkflow.nodes,
      edges: updatedWorkflow.edges,
      isDraft: updatedWorkflow.isDraft,
      isPublic: updatedWorkflow.isPublic,
      sharedWith: updatedWorkflow.sharedWith,
      tags: updatedWorkflow.tags,
      triggerType: updatedWorkflow.triggerType,
      cronSchedule: updatedWorkflow.cronSchedule,
      createdAt: updatedWorkflow.createdAt.toISOString(),
      updatedAt: updatedWorkflow.updatedAt.toISOString(),
      profileId: updatedWorkflow.profileId,
    };

    const response: CommonApiResponse<WorkflowResponse> = {
      data: workflowResponse,
      meta: null,
      message: "Workflow updated successfully.",
      status: 200,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error updating workflow:", error);
    return NextResponse.json(
      {
        data: null,
        meta: null,
        message: "An internal server error occurred. Please try again later.",
        status: 500,
      },
      { status: 500 }
    );
  }
};

export const PUT = authMiddleware(updateWorkflowHandler);