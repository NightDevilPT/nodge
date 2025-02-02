import { TextIcon } from "lucide-react";

import {
	AppNode,
	AppNodeData,
	NodeTypesEnum,
	SidebarButtonProps,
} from "../../interface";
import { TextNode } from "./text-node";
import { TextNodeJson } from "./text-node/text-node";

export const NodeRegistry: Record<NodeTypesEnum, { component: React.ComponentType<AppNode>; data: AppNodeData }> = {
	[NodeTypesEnum.TEXT_NODE]: {
		component: TextNode,
		data: TextNodeJson,
	},
};

export const NodeTypeDefination:any = Object.fromEntries(
	Object.entries(NodeRegistry).map(([key, value]) => [key, value.component])
);

export const SidebarButtons: { [key: string]: SidebarButtonProps[] } = {
	"General Node": [
		{
			label: "Text Node",
			icon: TextIcon,
			type: NodeTypesEnum.TEXT_NODE,
		},
	],
	"Extraction Node": [],
	"Apis Node": [],
};
