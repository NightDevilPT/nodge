export interface Workflow {
	id: string;
	name: string;
	nodes: any; // JSON object for nodes
	edges: any; // JSON object for edges
	description?: string;
	createdAt: string; // ISO date string
	updatedAt: string; // ISO date string
	profileId: string; // Relation with Profile table
}

export interface CreateWorkflowRequest {
	name: string;
	nodes: any; // JSON object for nodes
	edges: any; // JSON object for edges
	description?: string;
	profileId: string;
}

export interface UpdateWorkflowRequest {
	id: string;
	name?: string;
	nodes?: any; // JSON object for nodes
	edges?: any; // JSON object for edges
	description?: string;
}

export interface DeleteWorkflowRequest {
	id: string;
}

export interface WorkflowResponse {
	workflow: Workflow;
}

export interface WorkflowsResponse {
	workflows: Workflow[];
}
