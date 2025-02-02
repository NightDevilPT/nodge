import { TbCopy, TbTextCaption, TbTrash } from "react-icons/tb";
import TextNodeInfo from "./text-node-info";
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
		icon: TbTextCaption,
		info: TextNodeInfo,
		label: "Text Node",
	},
	outputValue: "",
};
