import {
	AppNode,
	AppNodeData,
	NodeTypesEnum,
	SidebarButtonProps,
} from "../../interface";
import FileNode from "./general-nodes/file-node";
import TextNode from "./general-nodes/text-node";
import NumberNode from "./general-nodes/number-node";
import { FileNodeJson } from "./general-nodes/file-node/config";
import { TextNodeJson } from "./general-nodes/text-node/config";
import { NumberNodeJson } from "./general-nodes/number-node/config";

export const NodeRegistry: Record<
	NodeTypesEnum,
	{ component: React.ElementType<AppNode>; data: AppNodeData }
> = {
	[NodeTypesEnum.TEXT_NODE]: {
		component: TextNode,
		data: TextNodeJson,
	},
	[NodeTypesEnum.NUMBER_NODE]: {
		component: NumberNode,
		data: NumberNodeJson,
	},
	[NodeTypesEnum.FILE_NODE]: {
		component: FileNode,
		data: FileNodeJson,
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
		{
			label: "File Node",
			type: NodeTypesEnum.FILE_NODE,
		},
	],
	"Extraction Node": [],
	"Network Node": [],
};

export const NodeTypeDefination: any = Object.fromEntries(
	Object.entries(NodeRegistry).map(([key, value]) => [key, value.component])
);
