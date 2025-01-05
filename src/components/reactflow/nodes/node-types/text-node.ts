import { AppNodeData, InputTypesEnum, NodeTypesEnum } from "../../interface";
import { MdOutlineTextFields } from "react-icons/md";

export const TextNodeElement: AppNodeData = {
	label: "Text Element",
	type: NodeTypesEnum.TEXT_ELEMENT,
	icon: MdOutlineTextFields,
	inputs: [
		{
			label: "Enter Text",
			required: true,
			type: InputTypesEnum.STRING,
			value: "",
			isEntryPoint:false,
			isConnectable:true,
			name:'text'
		},
	],
	output: {
		value: "",
		label: "Output",
	},
};
