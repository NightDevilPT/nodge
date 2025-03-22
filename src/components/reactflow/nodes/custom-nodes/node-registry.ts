import {
	AppNode,
	AppNodeData,
	NodeTypesEnum,
	SidebarButtonProps,
} from "../../interface";
import TextNode from "./general-nodes/text-node";
import { TextNodeJson } from "./general-nodes/text-node/config";

export const NodeRegistry: Record<
	NodeTypesEnum,
	{ component: React.ElementType<AppNode>; data: AppNodeData }
> = {
	[NodeTypesEnum.TEXT_NODE]: {
		component: TextNode,
		data: TextNodeJson,
	},
};

export const SidebarButtons: { [key: string]: SidebarButtonProps[] } = {
	"General Node": [
		{
			label: "Text Node",
			type: NodeTypesEnum.TEXT_NODE,
		}
	],
	"Extraction Node": [],
	"Network Node": [],
};

export const NodeTypeDefination: any = Object.fromEntries(
	Object.entries(NodeRegistry).map(([key, value]) => [key, value.component])
);
