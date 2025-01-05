import { AppNodeData, InputTypesEnum, NodeTypesEnum } from "../../interface";
import { MdOutlineNumbers } from "react-icons/md";

export const NumberNodeElement: AppNodeData = {
	label: "Number Element",
	type: NodeTypesEnum.NUMBER_ELEMENT,
	icon: MdOutlineNumbers,
	inputs: [
		{
			label: "Enter Number",
			required: true,
			type: InputTypesEnum.NUMBER,
			value: 0, // Default value for number input
			isEntryPoint:false,
			isConnectable:true,
			name:'number'
		},
	],
	output: {
		value: 0,
		label: "Output",
	},
};
