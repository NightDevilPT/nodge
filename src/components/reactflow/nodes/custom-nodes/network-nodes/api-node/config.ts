import { TbCopy, TbTrash } from "react-icons/tb";

import {
	AppNodeData,
	NodeApiMethodsEnum,
	NodeTypesEnum,
} from "@/components/reactflow/interface";
import { NodeHeaderIcons } from "../../node-utils";

export const ApiNodeJson: AppNodeData = {
	type: NodeTypesEnum.API_NODE, // Add this enum value to your NodeTypesEnum
	header: {
		copy: {
			isCopy: true,
			copyIcon: TbCopy,
		},
		dlt: {
			isDelete: true,
			deleteIcon: TbTrash,
		},
		icon: NodeHeaderIcons[NodeTypesEnum.API_NODE], // Add this icon to your NodeHeaderIcons
		// info: ApiNodeInfo,
		label: "API Node",
		type: NodeTypesEnum.API_NODE,
	},
	isInitialNode: true,
	outputValue: null, // You can set this to the expected output type
	apiData: {
		url: "",
		method: NodeApiMethodsEnum.GET, // Default method
		headers: [],
		body: null,
		responseTree: [],
		selectedKeys: [],
	},
};
