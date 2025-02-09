import React from "react";

import BaseNode from "../../base-node";
import { AppNode, InputType } from "@/components/reactflow/interface";

export const TextNode = ({ data, id }: AppNode) => {
	const { header } = data;
	return (
		<BaseNode header={header} nodeId={id}>
			<div>Text Node</div>
		</BaseNode>
	);
};
