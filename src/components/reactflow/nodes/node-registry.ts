import { MdOutlineTextFields } from "react-icons/md";
import {
	AppNode,
	AppNodeData,
	NodeTypesEnum,
	SidebarButtonProps,
} from "../interface";
import { TEXT_NODE } from "./node-types/text-node";

export const NodeRegistry: Record<string, any> = {
	[NodeTypesEnum.TEXT_NODE]: TEXT_NODE,
};

export const SidebarButtons: { [key: string]: SidebarButtonProps[] } = {
	General: [
		{
			label: "Text",
			icon: MdOutlineTextFields,
			iconColor: "text-blue-500",
			type: NodeTypesEnum.TEXT_NODE,
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
			inputs: inputsWithHandles || [],
			output: outputWithHandle,
		},
	};

	return newNode;
};
