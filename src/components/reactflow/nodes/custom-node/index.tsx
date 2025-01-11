import React from "react";
import { NodeProps } from "@xyflow/react";

import { cn } from "@/lib/utils";
import NodeHeader from "./node-header";
import NodeContext from "./node-context";
import { Card } from "@/components/ui/card";
import { AppNodeData } from "../../interface";
import { Separator } from "@/components/ui/separator";

const NodeComponent = ({ id, data, selected }: NodeProps) => {
	const { header, type, inputs, output, execution } = data as AppNodeData;

	return (
		<Card
			className={cn(
				`py-3 bg-card rounded-md min-w-80 max-w-96 cursor-default space-y-3 ${
					selected && "ring-primary/50 ring-1"
				}`
			)}
		>
			<NodeHeader {...header} />
			<Separator />
			<NodeContext nodeId={id} inputs={inputs || []} />
		</Card>
	);
};

export default NodeComponent;
