export interface GetWorkflowsQuery {
	page?: string;
	limit?: string;
	search?: string;
	sortBy?: string;
	sortOrder?: string;
	isDraft?: string;
	isPublic?: string;
	tags?: string;
}

// Define interfaces for the workflow
export interface CreateWorkflowRequest {
	banner?: string;
	name: string;
	description?: string;
	nodes: any;
	edges: any;
	isDraft?: boolean;
	isPublic?: boolean;
	sharedWith?: string[];
	tags?: string[];
	triggerType?: "MANUAL" | "SCHEDULED" | "WEBHOOK";
	cronSchedule?: string;
}

export interface WorkflowResponse {
	id: string;
	banner: string | null;
	name: string;
	description: string;
	nodes: any;
	edges: any;
	isDraft: boolean;
	isPublic: boolean;
	sharedWith: string[];
	tags: string[];
	triggerType: string | null;
	cronSchedule: string | null;
	createdAt: string;
	updatedAt: string;
	profileId: string;
	user?: {
		email: string;
		firstName: string;
		lastName: string;
	};
	actions?: React.ElementType;
}
