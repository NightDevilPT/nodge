import { IoDocumentAttachOutline } from "react-icons/io5";
import { TbCopy, TbTrash, TbPlayerPlay } from "react-icons/tb";
import { AppNodeData, NodeTypesEnum } from "@/components/reactflow/interface";

import FileNodeInfo from "./info";

export const FileNodeJson: AppNodeData = {
	type: NodeTypesEnum.FILE_NODE,
	header: {
		label: "File Node",
		type: NodeTypesEnum.FILE_NODE,
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
		icon: IoDocumentAttachOutline,
		info: FileNodeInfo
	},
	inputs: [
		{
			label: "Select File",
			value: "",
			type: "file",
			required: true,
			sourceId: null,
			targetId: null,
			isShowSource: true,
			isShowTarget: false,
			mapped: {
				connectedSource: null,
				connectedTarget: null,
			},
		},
	],
	isInitialNode: true,
};
