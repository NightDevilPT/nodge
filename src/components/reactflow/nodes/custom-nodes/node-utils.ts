import { MdTextFields } from "react-icons/md";
import { TbNumber123 } from "react-icons/tb";
import { NodeTypesEnum } from "../../interface";

export const NodeHeaderIcons = {
	[NodeTypesEnum.TEXT_NODE]: MdTextFields,
	[NodeTypesEnum.NUMBER_NODE]: TbNumber123,
};

export const NodeTypeColors = {
	[NodeTypesEnum.TEXT_NODE]: "text-blue-500",
	[NodeTypesEnum.NUMBER_NODE]: "text-green-500",
};