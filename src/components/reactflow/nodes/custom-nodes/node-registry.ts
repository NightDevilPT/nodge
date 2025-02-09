import {
	AppNode,
	AppNodeData,
	NodeTypesEnum,
	SidebarButtonProps,
} from "../../interface";
import { TextNode } from "./general-nodes/text-node";
import { NumberNode } from "./general-nodes/number-node";
import { NumberNodeJson } from "./general-nodes/number-node/config";
import { TextNodeJson } from "./general-nodes/text-node/config";
import { MdTextFields } from "react-icons/md";
import { TbNumber123 } from "react-icons/tb";

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
	"Apis Node": [],
};

export const NodeTypeDefination: any = Object.fromEntries(
	Object.entries(NodeRegistry).map(([key, value]) => [key, value.component])
);
