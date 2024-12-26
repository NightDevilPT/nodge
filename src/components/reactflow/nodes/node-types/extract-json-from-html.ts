import { LuFileJson } from "react-icons/lu";
import { AppNodeData, InputTypesEnum, NodeTypesEnum } from "../../interface";

export const ExtractJsonFromElement: AppNodeData = {
	label: "Extract Json From Element",
	type: NodeTypesEnum.EXTRACT_JSON_FROM_ELEMENT,
	icon: LuFileJson,
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
