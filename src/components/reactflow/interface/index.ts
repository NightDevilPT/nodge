import { Node } from "@xyflow/react";

export enum NodeTypesEnum {
	EXTRACT_TEXT_FROM_ELEMENT = "extract-text-from-element",
	EXTRACT_JSON_FROM_ELEMENT = "extract-json-from-element",
}

export interface AppNodeData {
	type: NodeTypesEnum;
	label: string;
	icon: React.ElementType;
	inputs: NodeInputProps[];
	output: NodeOutputProps;
	execution?: () => void;
	[key: string]: any;
}

export enum InputTypesEnum {
	STRING = "STRING",
}

export interface NodeOutputProps {
	label: string;
	value: string;
}

export interface NodeInputProps {
	label: string;
	type: InputTypesEnum;
	value: string;
	helperText: string;
	required: boolean;
}

export interface AppNode extends Node {
	data: AppNodeData;
}

export interface SidebarButtonProps {
	label: string;
	icon: React.ElementType;
	type: NodeTypesEnum;
}
