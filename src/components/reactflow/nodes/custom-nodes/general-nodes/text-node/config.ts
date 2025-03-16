import { IoPlayOutline } from "react-icons/io5";
import { TbCopy, TbTrash } from "react-icons/tb";

import TextNodeInfo from "./info";
import { NodeHeaderIcons } from "../../node-utils";
import { AppNodeData, NodeTypesEnum } from "@/components/reactflow/interface";

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
		execute:{
			isExecute: true,
            ExecuteIcon: IoPlayOutline, // Add this icon to your NodeHeaderIcons
		},
		icon: NodeHeaderIcons[NodeTypesEnum.TEXT_NODE],
		info: TextNodeInfo,
		label: "Text Node",
		type: NodeTypesEnum.TEXT_NODE,
	},
	inputValue:"",
	isInitialNode:false,
	outputValue: "",
};
