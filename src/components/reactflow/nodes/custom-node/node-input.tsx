import React from "react";
import { NodeInputs } from "../../interface";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Handle, Position } from "@xyflow/react";

const NodeInput = ({
	label,
	type,
	value,
	helperText,
	required,
}: NodeInputs) => {
	return (
		<div className={`w-full h-auto grid grid-cols-1 gap-1 relative rounded-b-md`}>
			<Handle type={"target"} position={Position.Left} className={`!w-4 !h-4 !rounded-full !bg-yellow-400 absolute !-left-3.5`} />
			<Label htmlFor={label} className={`text-sm text-foreground`}>
				{label} {required && <span className={`text-red-500`}>*</span>}
			</Label>
			<Input type={type} id={label} placeholder={label} className={`bg-background text-foreground`} />
			{helperText && (
				<Label className={`text-xs px-2`}>{helperText}</Label>
			)}
		</div>
	);
};

export default NodeInput;
