import { TextIcon } from "lucide-react";

import {
	AppNode,
	AppNodeData,
	NodeHeaderProps,
	NodeTypesEnum,
	SidebarButtonProps,
} from "../../interface";
import { TextNode } from "./text-node";
import { TextNodeJson } from "./text-node/text-node";
import { MdTextFields } from "react-icons/md";

export const NodeRegistry: Record<
	NodeTypesEnum,
	{ component: React.ComponentType<AppNode>; data: AppNodeData }
> = {
	[NodeTypesEnum.TEXT_NODE]: {
		component: TextNode,
		data: TextNodeJson,
	},
};

export const NodeTypeColors = {
	[NodeTypesEnum.TEXT_NODE]: "text-blue-500",
};

export const NodeHeaderIcons = {
	[NodeTypesEnum.TEXT_NODE]: MdTextFields,
};

export const NodeTypeDefination: any = Object.fromEntries(
	Object.entries(NodeRegistry).map(([key, value]) => [key, value.component])
);

export const SidebarButtons: { [key: string]: SidebarButtonProps[] } = {
	"General Node": [
		{
			label: "Text Node",
			type: NodeTypesEnum.TEXT_NODE,
		},
	],
	"Extraction Node": [],
	"Apis Node": [],
};
