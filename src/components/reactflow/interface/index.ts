import { Node } from "@xyflow/react";

export enum NodeTypesEnum {
	EXTRACT_TEXT_FROM_ELEMENT = "extract-text-from-element",
	EXTRACT_JSON_FROM_ELEMENT = "extract-json-from-element",
	OUTPUT_ELEMENT = "output-element",
	TEXT_ELEMENT = "text-element",
	NUMBER_ELEMENT = "number-element"
}

export interface AppNodeData {
	type: NodeTypesEnum;
	label: string;
	icon: React.ElementType;
	inputs?: NodeInputProps[];
	output?: NodeOutputProps;
	execution?: () => void;
	[key: string]: any;
}

export enum InputTypesEnum {
	STRING = "STRING",
	OUTPUT = "OUTPUT",
	NUMBER = "NUMBER",
}

export interface NodeOutputProps {
	id?:string;
	label: string;
	value: string | number;
}

export interface NodeInputProps {
	id?:string;
	label: string;
	type: InputTypesEnum;
	value: string | number;
	helperText?: string;
	required: boolean;
	isConnectable?: boolean;
	isEntryPoint:boolean;
	name:string;
}

export interface AppNode extends Node {
	data: AppNodeData;
}

export interface SidebarButtonProps {
	label: string;
	icon: React.ElementType;
	type: NodeTypesEnum;
}
