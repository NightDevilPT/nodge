import { PiLinkBold } from "react-icons/pi";
import { IoIosCopy } from "react-icons/io";
import { MdDelete } from "react-icons/md";

import { AppNodeData, InputTypesEnum, NodeTypesEnum } from "../../interface";

export const URL_NODE: AppNodeData = {
	type: NodeTypesEnum.URL_NODE,
	header: {
		label: "URL Node",
		isCopy: true,
		isDelete: true,
		iconColor: "text-blue-500",
		copyIcon: IoIosCopy,
		deleteIcon: MdDelete,
		icon: PiLinkBold,
	},
	execution: function () {
		console.log("URL Node Value:", this.inputs?.[0]?.value);
	},
	inputs: [
		{
			name: "url",
			label: "URL Node",
			helperText: "Enter a valid URL (e.g., https://example.com).",
			required: true,
			value: "",
			inputType: InputTypesEnum.URL,
		},
	],
};
