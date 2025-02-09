import { TbCopy, TbTrash } from "react-icons/tb";

import TextNodeInfo from "./info";
import { AppNodeData, NodeTypesEnum } from "@/components/reactflow/interface";
import { NodeHeaderIcons } from "../../node-utils";

export const TextNodeJson: AppNodeData = {
	type: NodeTypesEnum.TEXT_NODE,
	header: {
		copy: {
			isCopy: true,
			copyIcon: TbCopy,
		},
		dlt: {
			isDelete: true,
			deleteIcon: TbTrash,
		},
		icon: NodeHeaderIcons[NodeTypesEnum.TEXT_NODE],
		info: TextNodeInfo,
		label: "Text Node",
		type: NodeTypesEnum.TEXT_NODE,
	},
	isInitialNode:true,
	outputValue: "",
};
