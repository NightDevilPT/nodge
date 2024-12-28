import { AppNode, NodeTypesEnum, SidebarButtonProps } from "../interface";
import { ExtractTextFromElement } from "./node-types/extract-text-from-html";
import { ExtractJsonFromElement } from "./node-types/extract-json-from-html";
import { OutputNodeElement } from "./node-types/output-node";

import { FaCode } from "react-icons/fa6";
import { LuFileJson } from "react-icons/lu";
import { MdOutlineInput, MdOutlineNumbers, MdOutlineOutput, MdOutlineTextFields } from "react-icons/md";
import { TextNodeElement } from "./node-types/text-node";
import { NumberNodeElement } from "./node-types/number-node";

export const NodeRegistry = {
	[NodeTypesEnum.EXTRACT_TEXT_FROM_ELEMENT]: ExtractTextFromElement,
	[NodeTypesEnum.EXTRACT_JSON_FROM_ELEMENT]: ExtractJsonFromElement,
	[NodeTypesEnum.OUTPUT_ELEMENT]: OutputNodeElement,
	[NodeTypesEnum.TEXT_ELEMENT]: TextNodeElement,
	[NodeTypesEnum.NUMBER_ELEMENT]: NumberNodeElement
};

export const NodeIconColor = {
	[NodeTypesEnum.EXTRACT_TEXT_FROM_ELEMENT]: "text-orange-500",
	[NodeTypesEnum.EXTRACT_JSON_FROM_ELEMENT]: "text-yellow-500",
	[NodeTypesEnum.OUTPUT_ELEMENT]: "text-green-500",
	[NodeTypesEnum.TEXT_ELEMENT]: "text-blue-500",
	[NodeTypesEnum.NUMBER_ELEMENT]: "text-purple-500",
};

export const SidebarButtons: { [key: string]: SidebarButtonProps[] } = {
	General: [
		{
			label: NodeTypesEnum.TEXT_ELEMENT,
			icon: MdOutlineTextFields,
			type: NodeTypesEnum.TEXT_ELEMENT,
		},
		{
			label: NodeTypesEnum.OUTPUT_ELEMENT,
			icon: MdOutlineOutput,
			type: NodeTypesEnum.OUTPUT_ELEMENT,
		},
		{
			label: NodeTypesEnum.NUMBER_ELEMENT,
			icon: MdOutlineNumbers,
			type: NodeTypesEnum.NUMBER_ELEMENT,
		},
	],
	Extraction: [
		{
			label: NodeTypesEnum.EXTRACT_TEXT_FROM_ELEMENT,
			icon: FaCode,
			type: NodeTypesEnum.EXTRACT_TEXT_FROM_ELEMENT,
		},
		{
			label: NodeTypesEnum.EXTRACT_JSON_FROM_ELEMENT,
			icon: LuFileJson,
			type: NodeTypesEnum.EXTRACT_JSON_FROM_ELEMENT,
		},
	],
};

export const CreateNode = (type: NodeTypesEnum): AppNode => {
	return {
		id: crypto.randomUUID(),
		type: "FlowScrap",
		dragHandle: ".drag-handle__custom",
		position: { x: 0, y: 0 },
		data: NodeRegistry[type],
	};
};
