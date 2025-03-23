import { TbNumber123 } from "react-icons/tb";
import { MdTextFields } from "react-icons/md";
import { NodeTypesEnum } from "../../interface";
import { IoDocumentAttachOutline } from "react-icons/io5";

export const NodeHeaderIcons = {
	[NodeTypesEnum.TEXT_NODE]: MdTextFields,
	[NodeTypesEnum.NUMBER_NODE]: TbNumber123,
	[NodeTypesEnum.FILE_NODE]: IoDocumentAttachOutline,
};

export const NodeTypeColors = {
	[NodeTypesEnum.FILE_NODE]: "text-blue-500",
	[NodeTypesEnum.TEXT_NODE]: "text-blue-500",
	[NodeTypesEnum.NUMBER_NODE]: "text-blue-500",
};
