import { IoIosCopy } from "react-icons/io";
import { MdOutlineTextFields, MdDelete } from "react-icons/md";

import { AppNodeData, InputTypesEnum, NodeTypesEnum } from "../../interface";

export const TEXT_NODE: AppNodeData = {
	type: NodeTypesEnum.TEXT_NODE,
	header: {
		label: "Text",
		isCopy: true,
		isDelete: true,
		iconColor: "text-blue-500",
		copyIcon: IoIosCopy,
		deleteIcon: MdDelete,
		icon: MdOutlineTextFields,
	},
	execution: function () {
		console.log(this.inputs);
	},
	inputs: [
		{
			name: "text",
			label: "Text Node",
			helperText: "Enter the text you want.",
			required: true,
			value: "text",
			inputType: InputTypesEnum.TEXT,
		},
	],
};
