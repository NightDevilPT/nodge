import React from "react";
import { NodeInputs } from "../../interface";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const NodeInput = ({
	label,
	type,
	value,
	helperText,
	required,
}: NodeInputs) => {
	return (
		<div className={`w-full h-auto grid grid-cols-1 gap-1`}>
			<Label htmlFor={label}>
				{label} {required && <span className={`text-red-500`}>*</span>}
			</Label>
			<Input type={type} id={label} placeholder={label} className={`bg-background`} />
			{helperText && (
				<Label className={`text-xs px-2`}>{helperText}</Label>
			)}
		</div>
	);
};

export default NodeInput;
