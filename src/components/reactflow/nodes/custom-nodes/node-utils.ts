import { TbApi } from "react-icons/tb";
import { MdTextFields } from "react-icons/md";
import { NodeTypesEnum } from "../../interface";

export const NodeHeaderIcons = {
	[NodeTypesEnum.TEXT_NODE]: MdTextFields,
};

export const NodeTypeColors = {
	[NodeTypesEnum.TEXT_NODE]: "text-blue-500",
};
