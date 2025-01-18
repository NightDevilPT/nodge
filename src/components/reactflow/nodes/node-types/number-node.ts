import { IoIosCopy } from "react-icons/io";
import { MdOutlineNumbers, MdDelete } from "react-icons/md";

import { AppNodeData, InputTypesEnum, NodeTypesEnum } from "../../interface";

export const NUMBER_NODE: AppNodeData = {
	type: NodeTypesEnum.NUMBER_NODE,
	header: {
		label: "Number Node",
		copy: {
			isCopy: true,
			copyIcon: IoIosCopy,
		},
		dlt: {
			isDelete: true,
			deleteIcon: MdDelete,
		},
		iconColor: "text-green-500",
		icon: MdOutlineNumbers,
	},
	execution: function () {
		console.log("Number input:", this.inputs?.[0].value);
	},
	inputs: [
		{
			name: "numberInput",
			label: "Number Node",
			helperText: "Enter the number you want.",
			required: true,
			value: 0,
			inputType: InputTypesEnum.NUMBER,
			isSource:true
		},
	],
};
