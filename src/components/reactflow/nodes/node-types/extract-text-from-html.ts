import { FaCode } from "react-icons/fa6";
import { AppNodeData, InputTypesEnum, NodeTypesEnum } from "../../interface";

export const ExtractTextFromElement: AppNodeData = {
	label: "Extract Text From Element",
	type: NodeTypesEnum.EXTRACT_TEXT_FROM_ELEMENT,
	icon: FaCode,
	inputs: [
		{
			label: "Enter Web Url",
			required: true,
			type: InputTypesEnum.STRING,
			value: "",
			helperText: "eg : http://www.google.com",
		},
	],
	output: {
		value: "",
		label: "Extracted Text",
	},
};
