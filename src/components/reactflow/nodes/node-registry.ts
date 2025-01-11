import {
	MdOutlineNumbers,
	MdOutlineTextFields,
	MdOutlineFilePresent,
} from "react-icons/md";
import { PiLinkBold } from "react-icons/pi";

import {
	AppNode,
	AppNodeData,
	NodeTypesEnum,
	SidebarButtonProps,
} from "../interface";
import { URL_NODE } from "./node-types/url-node";
import { TEXT_NODE } from "./node-types/text-node";
import { NUMBER_NODE } from "./node-types/number-node";
import { FILE_INPUT_NODE } from "./node-types/file-node";

export const NodeRegistry: Record<string, any> = {
	[NodeTypesEnum.TEXT_NODE]: TEXT_NODE,
	[NodeTypesEnum.NUMBER_NODE]: NUMBER_NODE,
	[NodeTypesEnum.FILE_NODE]: FILE_INPUT_NODE,
	[NodeTypesEnum.URL_NODE]: URL_NODE,
};

export const SidebarButtons: { [key: string]: SidebarButtonProps[] } = {
	"General Node": [
		{
			label: "Text",
			icon: MdOutlineTextFields,
			iconColor: "text-blue-500",
			type: NodeTypesEnum.TEXT_NODE,
		},
		{
			label: "Number",
			icon: MdOutlineNumbers,
			iconColor: "text-green-500",
			type: NodeTypesEnum.NUMBER_NODE,
		},
		{
			label: "File",
			icon: MdOutlineFilePresent,
			iconColor: "text-purple-500",
			type: NodeTypesEnum.FILE_NODE,
		},
		{
			label: "Url",
			icon: PiLinkBold,
			iconColor: "text-blue-500",
			type: NodeTypesEnum.URL_NODE,
		},
	],
	Extraction: [],
};

export const CreateNode = (type: NodeTypesEnum): AppNode => {
	const nodeData: AppNodeData = NodeRegistry[type];
	const nodeId: string = crypto.randomUUID();

	const inputsWithHandles = nodeData?.inputs?.map((input) => ({
		...input,
		id: `${nodeId}:${crypto?.randomUUID()}`,
	}));

	const outputWithHandle = nodeData.output
		? {
				...nodeData.output,
				id: `${nodeId}:${crypto?.randomUUID()}`,
		  }
		: undefined;

	const newNode: AppNode = {
		id: nodeId,
		type: "FlowScrap",
		dragHandle: ".drag-handle__custom",
		position: { x: 0, y: 0 },
		data: {
			...nodeData,
			header: {
				...nodeData.header,
				nodeId,
			},
			inputs: inputsWithHandles || [],
			output: outputWithHandle,
		},
	};

	return newNode;
};
