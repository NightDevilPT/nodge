import { IoIosCopy } from "react-icons/io";
import { MdDelete, MdOutlineFilePresent } from "react-icons/md";

import { AppNodeData, InputTypesEnum, NodeTypesEnum } from "../../interface";

export const FILE_INPUT_NODE: AppNodeData = {
	type: NodeTypesEnum.FILE_NODE, // Define as an input node
	header: {
		label: "File Input Node", // Node title
		isCopy: true, // Enables copy functionality
		isDelete: true, // Enables delete functionality
		iconColor: "text-purple-500", // Icon styling
		copyIcon: IoIosCopy, // Copy icon
		deleteIcon: MdDelete, // Delete icon
		icon: MdOutlineFilePresent, // Icon for file input
	},
	execution: function () {
		console.log("File input:", this.inputs?.[0].value); // Execution logic for file input
	},
	inputs: [
		{
			name: "fileInput", // Input identifier
			label: "File Upload", // Label for the input
			helperText: "Upload a file of your choice.", // Helper text displayed below the input
			required: true, // Specifies that this input is required
			value: null, // Default value (null for file)
			inputType: InputTypesEnum.FILE, // Specifies the input type as a file
		},
	],
};
