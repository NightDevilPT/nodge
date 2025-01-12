import { Credential } from "./credential.interface";
import { Workflow } from "./workflow.interface";

export interface Profile {
	id: string;
	firstName: string;
	lastName: string;
	phoneNumber?: string;
	avatar?: string;
	createdAt: string; // ISO date string
	updatedAt: string; // ISO date string
	userId: string; // Relation with User table
	workflows?: Workflow[];
	credentials?: Credential[];
}

export interface CreateProfileRequest {
	firstName: string;
	lastName: string;
	phoneNumber?: string;
	avatar?: string;
	userId: string;
}

export interface UpdateProfileRequest {
	id: string;
	firstName?: string;
	lastName?: string;
	phoneNumber?: string;
	avatar?: string;
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
