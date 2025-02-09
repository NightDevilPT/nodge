import { MdTextFields } from "react-icons/md";
import { TbNumber123 } from "react-icons/tb";

import { TextNode } from "./text-node";
import { NumberNode } from "./number-node";
import { TextNodeJson } from "./text-node/config";
import { NumberNodeJson } from "./number-node/config";
import { NodeTypesEnum } from "@/components/reactflow/interface";

/** 🔹 Define node configurations in a structured format */
export const GeneralNodeConfigs = {
	[NodeTypesEnum.TEXT_NODE]: {
		component: TextNode,
		data: TextNodeJson,
		icon: MdTextFields,
		color: "text-blue-500",
		label: "Text Node",
	},
	[NodeTypesEnum.NUMBER_NODE]: {
		component: NumberNode,
		data: NumberNodeJson,
		icon: TbNumber123,
		color: "text-green-500",
		label: "Number Node",
	},
} as const; // `as const` ensures type safety and prevents accidental modifications
