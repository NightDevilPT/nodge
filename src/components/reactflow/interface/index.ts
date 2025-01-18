import React from "react";
import { Node } from "@xyflow/react";

export enum NodeTypesEnum {
	TEXT_NODE = "TEXT_NODE",
	NUMBER_NODE = "NUMBER_NODE",
	FILE_NODE = "FILE_NODE",
	URL_NODE = "URL_NODE",
}

type ValueTypes =
	| string
	| number
	| object
	| string[]
	| number[]
	| object[]
	| null;

export interface NodeHeaderProps {
	nodeId?: string;
	label: string;
	copy: {
		isCopy: boolean;
		copyIcon?: React.ElementType;
	};
	dlt: {
		isDelete: boolean;
		deleteIcon?: React.ElementType;
	};
	iconColor: string;
	icon: React.ElementType;
}

export interface AppNodeData {
	type: NodeTypesEnum;
	header: NodeHeaderProps;
	inputs?: NodeInputProps[];
	output?: NodeOutputProps;
	execution?: () => void;
	[key: string]: any;
}

export enum InputTypesEnum {
	TEXT = "text",
	NUMBER = "number",
	FILE = "file",
	TEXTAREA = "textarea",
	PASSWORD = "password",
	URL = "url",
}

export interface NodeOutputProps {
	id?: string;
	label: string;
	value: ValueTypes;
	isTarget?:boolean;
	isSource?:boolean;
}

export interface NodeInputProps {
	id?: string;
	name: string;
	label: string;
	required: boolean;
	helperText?: string;
	value: ValueTypes;
	inputType: InputTypesEnum;
	isTarget?:boolean;
	isSource?:boolean;
	onChange?: (value: ValueTypes) => void;
}

export interface AppNode extends Node {
	data: AppNodeData;
}

export interface SidebarButtonProps {
	label: string;
	icon: React.ElementType;
	iconColor: string;
	type: NodeTypesEnum;
}
