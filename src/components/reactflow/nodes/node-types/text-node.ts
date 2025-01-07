import { MdOutlineTextFields } from "react-icons/md";
import { AppNodeData, InputTypesEnum, NodeTypesEnum } from "../../interface";

export const TEXT_NODE: AppNodeData = {
	label: "Text",
	type: NodeTypesEnum.TEXT_NODE,
	icon: MdOutlineTextFields,
	iconColor:'text-blue-500',
	execution: function () {
		console.log(this.inputs);
	},
	inputs: [
		{
			name: "text",
			label: "Text Node",
			required: true,
			value: "text",
			inputType: InputTypesEnum.TEXT,
			isEntryPoint: true,
			isConnectable: true,
			isShowHandle: false,
		},
	],
};
