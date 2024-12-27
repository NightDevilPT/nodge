import React from "react";
import { NodeOutputProps } from "../../interface";
import { Label } from "@/components/ui/label";
import { Handle, Position } from "@xyflow/react";

const NodeOutput = ({
	label,
	value,
}: NodeOutputProps) => {
	console.log(value)
	return (
		<div className={`w-full h-auto grid grid-cols-1 gap-1 relative rounded-b-md mt-2`}>
			<Handle type={"source"} position={Position.Right} className={`!w-3 !h-3 !rounded-full !bg-green-400 absolute !-right-3.5`} />
			<Label htmlFor={label} className={`w-full text-right text-xs text-foreground`}>
				{label}
			</Label>
		</div>
	);
};

export default NodeOutput;
