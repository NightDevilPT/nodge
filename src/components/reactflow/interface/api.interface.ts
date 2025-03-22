export enum NodeApiMethodsEnum {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
	PATCH = "PATCH",
}

/** 🔹 API Response Tree (Supports Nested Data) */
export interface ResponseTreeNode {
	key: string; // e.g., "user", "user.name", "data[0]"
	valueType: "object" | "array" | "string" | "number" | "boolean" | "null";
	children?: ResponseTreeNode[];
	isExpandable?: boolean; // For large arrays
}

export interface ApiQueryHeader {
	key: string;
	value: string;
}

export interface ApiBody {
	key: string;
	value: string;
	type: "text" | "file" | "number";
}

/** 🔹 API Node Specific Data */
export interface APINodeData {
	url: string; // API endpoint URL
	method: NodeApiMethodsEnum; // HTTP method
	headers?: ApiQueryHeader[]; // API headers
	query?: ApiQueryHeader[]; // API headers
	body?: ApiBody[]; // API request body
	responseTree?: ResponseTreeNode[]; // Parsed API response structure
	selectedKeys?: string[]; // User-selected response keys for output
}