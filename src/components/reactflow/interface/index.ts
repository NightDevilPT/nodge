import React from "react";
import { Node } from "@xyflow/react";

export enum NodeTypesEnum {
	TEXT_NODE = "TEXT_NODE"
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
	execute?: {
		isExecute: boolean; // Whether the node can be deleted
		ExecuteIcon?: React.ElementType; // Icon for the delete action
	};
	icon: React.ElementType; // Node icon
	info?: React.ElementType;
	type?: NodeTypesEnum;
}

export interface InputHandlerProps {
	id?: string;
	label: string;
	value: ValueTypes;
	type: "text" | "number" | "file" | "select";
	onChange?: (value: ValueTypes) => void;
	options?: { key: string; value: string }[];
	placeholder?: string;
	required?: boolean;
	sourceId?: string | null;
	isShowSource?: boolean;
	targetId?: string | null;
	isShowTarget?: boolean;
	mapped: {
		connectedSource: string | null;
		connectedTarget: string | null;
	};
}

export interface InputProps {
	input:InputHandlerProps;
	nodeId: string;
}

export interface AppNodeData {
	type: NodeTypesEnum;
	header: NodeHeaderProps;
	inputs?: InputHandlerProps[]; // Input fields for the node
	execution?: () => void;
	isInitialNode: boolean;
	[key: string]: any;
}

export interface AppNode extends Node {
	data: AppNodeData;
}

export interface SidebarButtonProps {
	label: string;
	type: NodeTypesEnum;
}
