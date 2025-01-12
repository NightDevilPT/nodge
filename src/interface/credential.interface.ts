export interface Credential {
	id: string;
	credentialType: string;
	credentialsValue: any; // JSON object
	createdAt: string; // ISO date string
	updatedAt: string; // ISO date string
	profileId: string; // Relation with Profile table
}

export interface CreateCredentialRequest {
	credentialType: string;
	credentialsValue: any; // JSON object
	profileId: string;
}

export interface UpdateCredentialRequest {
	id: string;
	credentialType?: string;
	credentialsValue?: any; // JSON object
}

export interface DeleteCredentialRequest {
	id: string;
}

export interface CredentialResponse {
	credential: Credential;
}

export interface CredentialsResponse {
	credentials: Credential[];
}
