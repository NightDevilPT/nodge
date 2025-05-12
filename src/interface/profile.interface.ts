import { Credential } from "./credential.interface";
import { WorkflowResponse } from "./workflow.interface";

export interface Profile {
	id: string;
	firstName: string;
	lastName: string;
	phoneNumber?: string;
	gender?: string;
	avatar?: string;
	createdAt: string; // ISO date string
	updatedAt: string; // ISO date string
	userId: string; // Relation with User table
	workflows?: WorkflowResponse[];
	credentials?: Credential[];
	verified?: boolean;
}

export interface CreateProfileRequest {
	firstName: string;
	lastName: string;
	phoneNumber?: string;
	avatar?: string;
}

export interface UpdateProfileRequest {
	id: string;
	firstName?: string;
	lastName?: string;
	phoneNumber?: string;
	avatar?: string;
	gender?: string;
}

export interface DeleteProfileRequest {
	id: string;
}

export interface ProfileResponse {
	profile: Profile;
}

export interface ProfilesResponse {
	profiles: Profile[];
}
