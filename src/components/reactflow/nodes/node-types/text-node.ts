import { IoIosCopy } from "react-icons/io";
import { MdOutlineTextFields, MdDelete } from "react-icons/md";

import TextInput from "../custom-node/general-nodes/text-input";
import { AppNodeData, InputTypesEnum, NodeInputProps, NodeTypesEnum } from "../../interface";

export const TEXT_NODE: AppNodeData = {
	type: NodeTypesEnum.TEXT_NODE,
	header: {
		label: "Text",
		copy: {
			isCopy: true,
			copyIcon: IoIosCopy,
		},
		dlt: {
			isDelete: true,
			deleteIcon: MdDelete,
		},
		iconColor: "text-blue-500",
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
			isSource: true,
			renderNode: TextInput,
		},
	],
};
