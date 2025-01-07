import { Node } from "@xyflow/react";

export enum NodeTypesEnum {
	TEXT_NODE='TEXT_NODE'
}

type ValueTypes =
	| string
	| number
	| object
	| string[]
	| number[]
	| object[]
	| null;

export interface AppNodeData {
	type: NodeTypesEnum;
	label: string;
	icon: React.ElementType;
	iconColor:string;
	inputs?: NodeInputProps[];
	output?: NodeOutputProps;
	execution?: () => void;
	[key: string]: any;
}

export enum InputTypesEnum {
	TEXT = "text",
	FILE = "file",
	TEXTAREA = "textarea",
	PASSWORD = "password",
}

export interface NodeOutputProps {
	id?: string;
	label: string;
	value: ValueTypes;
}

export interface NodeInputProps {
	id?: string;
	name: string;
	label: string;
	required: boolean;
	helperText?: string;
	value: ValueTypes;
	inputType: InputTypesEnum;
	supportFileType?: string[];
	isEntryPoint: boolean;
	isConnectable:boolean;
	isShowHandle:boolean;
}

export interface AppNode extends Node {
	data: AppNodeData;
}

export interface SidebarButtonProps {
	label: string;
	icon: React.ElementType;
	iconColor:string;
	type: NodeTypesEnum;
}
