import {
	AppNode,
	AppNodeData,
	NodeTypesEnum,
	SidebarButtonProps,
} from "../../interface";
import { ApiNode } from "./network-nodes/api-node";
import { TextNode } from "./general-nodes/text-node";
import { NumberNode } from "./general-nodes/number-node";
import { ApiNodeJson } from "./network-nodes/api-node/config";
import { TextNodeJson } from "./general-nodes/text-node/config";
import { NumberNodeJson } from "./general-nodes/number-node/config";

export const NodeRegistry: Record<
	NodeTypesEnum,
	{ component: React.ComponentType<AppNode>; data: AppNodeData }
> = {
	[NodeTypesEnum.TEXT_NODE]: {
		component: TextNode,
		data: TextNodeJson,
	},
	[NodeTypesEnum.NUMBER_NODE]: {
		component: NumberNode,
		data: NumberNodeJson,
	},
	[NodeTypesEnum.API_NODE]: {
		component: ApiNode,
		data: ApiNodeJson, // Define API node data structure here
	},
};

export const SidebarButtons: { [key: string]: SidebarButtonProps[] } = {
	"General Node": [
		{
			label: "Text Node",
			type: NodeTypesEnum.TEXT_NODE,
		},
		{
			label: "Number Node",
			type: NodeTypesEnum.NUMBER_NODE,
		},
	],
	"Extraction Node": [],
	"Network Node": [
		{
			label: "API Node",
			type: NodeTypesEnum.API_NODE,
		},
	],
};

export const NodeTypeDefination: any = Object.fromEntries(
	Object.entries(NodeRegistry).map(([key, value]) => [key, value.component])
);
