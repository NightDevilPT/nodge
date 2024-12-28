import { LuFileJson } from "react-icons/lu";
import { AppNodeData, InputTypesEnum, NodeTypesEnum } from "../../interface";
import { MdOutlineOutput } from "react-icons/md";

export const OutputNodeElement: AppNodeData = {
	label: "Output Element",
	type: NodeTypesEnum.OUTPUT_ELEMENT,
	icon: MdOutlineOutput,
	inputs: [
		{
			label: "Enter Web Url",
			required: true,
			type: InputTypesEnum.OUTPUT,
			value: "",
			helperText: "eg : http://www.google.com",
		},
	]
};
