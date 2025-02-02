import React from "react";

import BaseNode from "../../base-node";
import { AppNode } from "@/components/reactflow/interface";

export const TextNode = ({ data, id }: AppNode) => {
	const { header } = data;
	return (
		<BaseNode header={header} nodeId={id}>
			Text Node Content
		</BaseNode>
	);
};
