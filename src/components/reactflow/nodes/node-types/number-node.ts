import { IoIosCopy } from "react-icons/io";
import { MdOutlineNumbers, MdDelete } from "react-icons/md";

import { AppNodeData, InputTypesEnum, NodeTypesEnum } from "../../interface";

export const NUMBER_NODE: AppNodeData = {
	type: NodeTypesEnum.TEXT_NODE,
	header: {
		label: "Number Node",
		isCopy: true,
		isDelete: true,
		iconColor: "text-green-500",
		copyIcon: IoIosCopy,
		deleteIcon: MdDelete,
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
		},
	],
};
