import React from "react";

import { NodeInputProps } from "../../interface";
import { CardContent } from "@/components/ui/card";

const NodeContext = ({
	inputs,
	nodeId,
}: {
	inputs: NodeInputProps[];
	nodeId: string;
}) => {
	return (
		<CardContent className="p-0 px-3 space-y-2">
			{inputs.map((input, index) => {
				const { renderNode: RenderChild } = input;
				if (!RenderChild) {
					return null;
				}
				return (
					<RenderChild key={index} nodeId={nodeId} input={input} />
				);
			})}
		</CardContent>
	);
};

export default NodeContext;
