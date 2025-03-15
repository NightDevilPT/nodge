import { TbApi } from "react-icons/tb";

import { ApiNode } from "./api-node";
import { ApiNodeJson } from "./api-node/config";
import { NodeTypesEnum } from "@/components/reactflow/interface";

/** 🔹 Define node configurations in a structured format */
export const NetworkNodeConfigs = {
	[NodeTypesEnum.API_NODE]: {
		component: ApiNode,
		data: ApiNodeJson,
		icon: TbApi,
		color: "text-yellow-500",
		label: "API Node",
	},
} as const; // `as const` ensures type safety and prevents accidental modifications
