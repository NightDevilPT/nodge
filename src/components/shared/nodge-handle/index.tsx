import React, { useMemo } from "react";
import { Handle, Position } from "@xyflow/react";
import { generateUuid } from "@/lib/uuid-generator";

export enum NodgeType {
	target = "target",
	source = "source",
}

interface NodgeHandleProps {
	nodeId: string;
	type: NodgeType;
	color?: string;
	isConnectable?: boolean;
}

export const NodgeHandle = React.memo(
	({ type, isConnectable = true, color, nodeId }: NodgeHandleProps) => {
		const handleId = useMemo(() => generateUuid(nodeId, type), [nodeId, type]);

		console.log(`Rendering NodgeHandle - ID: ${handleId}, Type: ${type}`);

		return (
			<Handle
				type={type}
				position={type === NodgeType.source ? Position.Right : Position.Left}
				id={handleId}
				className={`!w-3 !h-3 ${
					type === NodgeType.source ? "!-right-3 !top-2/3" : "!-left-3 !top-2/3"
				} ${type === NodgeType.source ? "!bg-yellow-500" : "!bg-blue-500"} ${color}`}
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
