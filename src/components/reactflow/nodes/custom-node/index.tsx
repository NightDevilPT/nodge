import React from "react";
import { AppNode, AppNodeData } from "../../interface";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import NodeHeader from "./node-header";
import { NodeProps } from "@xyflow/react";

const NodeComponent = ({ id, data, selected }: NodeProps) => {
	const {
		type,
		inputs,
		output,
		icon: Icon,
		label,
		iconColor,
	} = data as AppNodeData;

	return (
		<Card
			className={cn(
				`p-3 bg-card rounded-md space-y-0 min-w-80 cursor-default`
			)}
		>
			<NodeHeader
				nodeId={id}
				label={label}
				iconColor={iconColor}
				icon={Icon}
			/>
		</Card>
	);
};

export default NodeComponent;
