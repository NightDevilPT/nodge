import React from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { updateNodeInputValue } from "@/lib/update-node-value";
import { NodeInputProps } from "@/components/reactflow/interface";

const URLInputNode = ({
	input,
	nodeId,
}: {
	input: NodeInputProps;
	nodeId: string;
}) => {
	const { label, helperText, required, value, id } = input;
	const { getNode, updateNode } = useReactFlow();
	const isValidURL = /^https?:\/\/[^\s$.?#].[^\s]*$/i;

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const inputValue = event.target.value;

		// Validate if input is a URL (simple regex check)
		// const isValidURL = /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(inputValue);
		// console.log(isValidURL,'isvalid')

		// Update node value
		updateNodeInputValue(nodeId, id || "", inputValue, getNode, updateNode);
	};

	return (
		<div className={`w-full grid grid-cols-1 gap-1 relative`}>
			{/* Node connection handle */}
			<Handle
				type="target"
				id={id}
				position={Position.Left}
				className={cn(`!w-3 !h-3 absolute !-left-3.5 !bg-yellow-500`)}
			/>
			{/* Label */}
			<Label className={`text-sm`}>
				{label} {required && <span className={`text-red-500`}>*</span>}
			</Label>
			{/* URL Input Field */}
			<Input
				type="url"
				placeholder="https://example.com"
				className={`bg-accent ${
					!isValidURL.test(value as string) &&
					(value as string).length > 0 &&
					" !border-red-400"
				}`}
				value={value as string}
				onChange={handleInputChange}
			/>
			{/* Helper Text */}
			{helperText && (
				<Label className={`text-xs pl-1 text-white/20`}>
					{helperText}
				</Label>
			)}
		</div>
	);
};

export default URLInputNode;
