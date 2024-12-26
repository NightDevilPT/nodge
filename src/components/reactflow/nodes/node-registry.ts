import { FaCode } from "react-icons/fa6";
import {
	AppNode,
	AppNodeData,
	NodeTypesEnum,
	SidebarButtonProps,
} from "../interface";
import { ExtractTextFromElement } from "./node-types/extract-text-from-html";
import { LuFileJson } from "react-icons/lu";
import { ExtractJsonFromElement } from "./node-types/extract-json-from-html";

export const NodeRegistry = {
	[NodeTypesEnum.EXTRACT_TEXT_FROM_ELEMENT]: ExtractTextFromElement,
	[NodeTypesEnum.EXTRACT_JSON_FROM_ELEMENT]: ExtractJsonFromElement,
};

export const SidebarButtons: { [key: string]: SidebarButtonProps[] } = {
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
		dragHandle:'.drag-handle__custom',
		position: { x: 0, y: 0 },
		data: NodeRegistry[type],
	};
};
