import { NodeProps } from "@xyflow/react";
import React from "react";
import { AppNodeData, NodeInputs } from "../../interface";
import { Card, CardContent } from "@/components/ui/card";
import NodeHeader from "./node-header";
import NodeInput from "./node-input";

const NodeComponent = ({
	id,
	data,
	selected,
	dragHandle,
	isConnectable,
	zIndex,
	positionAbsoluteX,
	positionAbsoluteY,
	targetPosition,
	sourcePosition,
	dragging,
}: NodeProps) => {
	const { type, inputs, output, icon: Icon, label } = data as AppNodeData;
	return (
		<Card
			className={`rounded-md ${
				selected && "ring-2 ring-primary/80"
			}`}
		>
			<NodeHeader icon={Icon} label={label} dragHandle={dragHandle} />
			<CardContent className={`p-0 px-3 py-3 bg-secondary rounded-b-md`}>
				{inputs.map((items: NodeInputs, index: number) => (
					<NodeInput {...items} key={items.label + ":" + index} />
				))}
			</CardContent>
		</Card>
	);
};

export default NodeComponent;
