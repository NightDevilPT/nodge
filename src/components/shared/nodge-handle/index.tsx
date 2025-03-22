import React, { useMemo } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { generateUuid } from "@/lib/uuid-generator";
import { AppNode } from "@/components/reactflow/interface";

export enum NodgeType {
	target = "target",
	source = "source",
}

interface NodgeHandleProps {
	nodeId: string;
	type: NodgeType;
	color?: string;
	isConnectable?: boolean;
	inputId?: string;
}

export const NodgeHandle = React.memo(
	({
		type,
		isConnectable = true,
		color,
		nodeId,
		inputId,
	}: NodgeHandleProps) => {
		const {getNode} = useReactFlow();
		const currentNode = getNode(nodeId) as AppNode | undefined;
		const currentInput = currentNode?.data?.inputs?.find(
			(input) => input.id === inputId
		);
		return (
			<Handle
				type={type}
				position={
					type === NodgeType.source ? Position.Right : Position.Left
				}
				id={currentInput?.id}
				className={`!w-3 !h-3 ${
					type === NodgeType.source
						? "!-right-3 !top-2/3"
						: "!-left-3 !top-2/3"
				} ${
					type === NodgeType.source
						? "!bg-yellow-500"
						: "!bg-blue-500"
				} ${color}`}
				isConnectable={isConnectable}
			/>
		);
	},
	(prevProps, nextProps) =>
		prevProps.nodeId === nextProps.nodeId &&
		prevProps.type === nextProps.type &&
		prevProps.color === nextProps.color &&
		prevProps.isConnectable === nextProps.isConnectable
);

// ✅ Fix: Add a display name
NodgeHandle.displayName = "NodgeHandle";
