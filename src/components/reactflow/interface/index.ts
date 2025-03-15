import React from "react";
import { Node } from "@xyflow/react";

export enum NodeTypesEnum {
	TEXT_NODE = "TEXT_NODE",
	NUMBER_NODE = "NUMBER_NODE",
	API_NODE = "API_NODE",
}

export enum NodeApiMethodsEnum {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
	PATCH = "PATCH",
}

export interface NodeRegistryType {
	[key: string]: {
		component: React.ElementType;
		config: any;
	};
}

type ValueTypes =
	| string
	| number
	| object
	| string[]
	| number[]
	| { key: string; value: string }[] // For headers or query parameters
	| null;

export interface NodeHeaderProps {
	nodeId?: string; // ID of the node (useful for copying or deleting the node)
	label: string; // Title of the node
	copy: {
		isCopy: boolean; // Whether the node can be copied
		copyIcon?: React.ElementType; // Icon for the copy action
	};
	dlt: {
		isDelete: boolean; // Whether the node can be deleted
		deleteIcon?: React.ElementType; // Icon for the delete action
	};
	icon: React.ElementType; // Node icon
	info?: React.ElementType;
	type?: NodeTypesEnum;
}

/** 🔹 API Response Tree (Supports Nested Data) */
export interface ResponseTreeNode {
	key: string; // e.g., "user", "user.name", "data[0]"
	valueType: "object" | "array" | "string" | "number" | "boolean" | "null";
	children?: ResponseTreeNode[];
	isExpandable?: boolean; // For large arrays
}

/** 🔹 API Node Specific Data */
export interface APINodeData {
	url: string; // API endpoint URL
	method: NodeApiMethodsEnum; // HTTP method
	headers?: { key: string; value: string }[]; // API headers
	query?: { key: string; value: string }[]; // API headers
	body?: any; // API request body
	responseTree?: ResponseTreeNode[]; // Parsed API response structure
	selectedKeys?: string[]; // User-selected response keys for output
}

export interface AppNodeData {
	type: NodeTypesEnum;
	header: NodeHeaderProps;
	outputValue: ValueTypes;
	execution?: () => void;
	isInitialNode: boolean;
	apiData?: APINodeData; // Optional API data for API nodes
	[key: string]: any;
}

export interface AppNode extends Node {
	data: AppNodeData;
}

export interface SidebarButtonProps {
	label: string;
	type: NodeTypesEnum;
}
