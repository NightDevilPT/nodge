import { Node } from "@xyflow/react";

export enum NodeTypesEnum {
	INPUTNODE = "Input",
	OUTPUTNODE = "Output",
	DEFAULTNODE = "Default",
}

export interface AppNodeData {
	[key: string]: any;
}

export interface AppNode extends Node {
	type: NodeTypesEnum;
	data: AppNodeData;
}

export interface ToolbarButtonProps {
	id?: string;
	label: string;
	type: NodeTypesEnum;
	icon: React.ElementType;
}

export class ToolbarButton implements ToolbarButtonProps {
	id: string;
	label: string;
	type: NodeTypesEnum;
	icon: React.ElementType;

	constructor(
		label: string,
		type: NodeTypesEnum,
		icon: React.ElementType,
		id?: string // Optional ID should be the last parameter for clarity
	) {
		this.id = id || crypto.randomUUID();
		this.label = label;
		this.type = type;
		this.icon = icon;
	}
}
