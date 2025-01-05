import { NodeProps } from "@xyflow/react";
import React from "react";
import { AppNodeData, NodeInputProps, NodeTypesEnum } from "../../interface";
import { Card, CardContent } from "@/components/ui/card";
import NodeHeader from "./node-header";
import NodeInput from "./node-input";
import { NodeIconColor } from "../node-registry";
import NodeOutput from "./node-output";

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
	console.log(
		id,
		isConnectable,
		zIndex,
		positionAbsoluteX,
		positionAbsoluteY,
		targetPosition,
		sourcePosition,
		dragging
	);
	const { type, inputs, output, icon: Icon, label } = data as AppNodeData;
	return (
		<Card className={`rounded-md ${selected && "ring-2 ring-primary/80"}`}>
			<NodeHeader
				icon={Icon}
				label={label}
				dragHandle={dragHandle}
				iconColor={NodeIconColor[type as NodeTypesEnum]}
				nodeId={id}
			/>
			<CardContent
				className={`p-0 px-3 py-3 rounded-b-m bg-secondary dark:bg-card`}
			>
				{inputs?.map((items: NodeInputProps, index: number) => (
					<NodeInput
						{...items}
						key={items.label + ":" + index}
						nodeId={id}
					/>
				))}
				{output && <NodeOutput {...output} />}
			</CardContent>
		</Card>
	);
};

export default NodeComponent;
