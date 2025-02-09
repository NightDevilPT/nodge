import { TbCopy, TbTrash } from "react-icons/tb";

import NumberNodeInfo from "./info";
import { NodeHeaderIcons } from "../../node-utils";
import { AppNodeData, NodeTypesEnum } from "@/components/reactflow/interface";

export const NumberNodeJson: AppNodeData = {
	type: NodeTypesEnum.NUMBER_NODE,
	header: {
		copy: {
			isCopy: true,
			copyIcon: TbCopy,
		},
		dlt: {
			isDelete: true,
			deleteIcon: TbTrash,
		},
		icon: NodeHeaderIcons[NodeTypesEnum.NUMBER_NODE],
		info: NumberNodeInfo,
		label: "Number Node",
		type: NodeTypesEnum.NUMBER_NODE,
	},
	isInitialNode: true,
	outputValue: "",
};
