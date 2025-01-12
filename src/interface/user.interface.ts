export interface User {
	id: string;
	username: string;
	email: string;
	isVerified: boolean;
	token?: string;
	provider: "GITHUB" | "CREDENTIAL" | "GOOGLE";
	password?: string;
	createdAt: string; // ISO date string
	updatedAt: string; // ISO date string
}

export interface CreateUserRequest {
	username: string;
	email: string;
	password: string;
	provider?: "GITHUB" | "CREDENTIAL" | "GOOGLE";
	token?: string;
}

export interface UpdateUserRequest {
	id: string;
	username?: string;
	email?: string;
	isVerified?: boolean;
	token?: string;
	password?: string;
}

export interface DeleteUserRequest {
	id: string;
}

export interface UserResponse {
	user: User;
}

export interface UsersResponse {
	users: User[];
}
