import React from "react";
import { Node } from "@xyflow/react";

export enum NodeTypesEnum {
	TEXT_NODE = "TEXT_NODE",
}

export const NodeTypeColors = {
	[NodeTypesEnum.TEXT_NODE]: "text-blue-500",
};

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
}

export interface AppNodeData {
	type: NodeTypesEnum;
	header: NodeHeaderProps;
	outputValue: ValueTypes;
	execution?: () => void;
	[key: string]: any;
}

export interface AppNode extends Node {
	data: AppNodeData;
}

export interface SidebarButtonProps {
	label: string;
	icon: React.ElementType;
	type: NodeTypesEnum;
}
