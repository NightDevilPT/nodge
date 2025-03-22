import { MdOutlineTextFields } from "react-icons/md";
import { TbCopy, TbTrash, TbPlayerPlay } from "react-icons/tb";
import { AppNodeData, NodeTypesEnum } from "@/components/reactflow/interface";
import TextNodeInfo from "./info";

export const TextNodeJson: AppNodeData = {
	type: NodeTypesEnum.TEXT_NODE,
	header: {
		label: "Text Node",
		type: NodeTypesEnum.TEXT_NODE,
		copy: {
			isCopy: true,
			copyIcon: TbCopy,
		},
		dlt: {
			isDelete: true,
			deleteIcon: TbTrash,
		},
		execute: {
			isExecute: true,
			ExecuteIcon: TbPlayerPlay,
		},
		icon: MdOutlineTextFields,
		info: TextNodeInfo
	},
	inputs: [
		{
			label: "Enter Text",
			value: "",
			type: "text",
			required: true,
			sourceId: null,
			targetId: null,
			isShowSource: true,
			isShowTarget: true,
			mapped: {
				connectedSource: null,
				connectedTarget: null,
			},
		},
	],
	isInitialNode: true,
};
