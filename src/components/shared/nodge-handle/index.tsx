import React from "react";
import { Handle, Position } from "@xyflow/react";

export enum NodgeType{
	target = "target",
	source = "source"
}

interface NodgeHandleProps {
	type: NodgeType;
	id?: string;
	color?: string;
	isConnectable?: boolean;
}

const NodgeHandle: React.FC<NodgeHandleProps> = ({
	type,
	id,
	isConnectable = true,
	color,
}) => {
	return (
		<Handle
			type={type}
			position={type === "source" ? Position.Right : Position.Left}
			id={id}
			className={`!w-3 !h-3 ${
				type===NodgeType.source ? "!-right-3 !top-2/3" : "!-left-3 !top-2/3"
			} ${
				type === NodgeType.source ? "!bg-yellow-500" : "!bg-blue-500"
			} absolute ${color}`}
			isConnectable={isConnectable}
		/>
	);
};

export default NodgeHandle;
