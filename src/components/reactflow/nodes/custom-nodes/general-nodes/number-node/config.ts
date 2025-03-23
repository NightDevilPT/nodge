import { TbNumber123 } from "react-icons/tb";
import { TbCopy, TbTrash, TbPlayerPlay } from "react-icons/tb";
import NumberNodeInfo from "./info";
import { AppNodeData, NodeTypesEnum } from "@/components/reactflow/interface";

export const NumberNodeJson: AppNodeData = {
	type: NodeTypesEnum.NUMBER_NODE,
	header: {
		label: "Number Node",
		type: NodeTypesEnum.NUMBER_NODE,
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
		icon: TbNumber123,
		info: NumberNodeInfo,
	},
	inputs: [
		{
			label: "Enter Number",
			value: "",
			type: "number",
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
