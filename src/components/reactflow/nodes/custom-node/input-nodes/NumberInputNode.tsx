import React from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateNodeInputValue } from "@/lib/update-node-value";
import { NodeInputProps } from "@/components/reactflow/interface";

const NumberInputNode = ({
	input,
	nodeId,
}: {
	input: NodeInputProps;
	nodeId: string;
}) => {
	const {
		label,
		helperText,
		required,
		value,
		onChange,
		id,
		isTarget,
		isSource,
	} = input;
	const { getNode, updateNode } = useReactFlow();

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		updateNodeInputValue(
			nodeId,
			id || "",
			event.target.value,
			getNode,
			updateNode
		); // Use the utility function
	};

	return (
		<>
			<div className={`w-full grid grid-cols-1 gap-1 relative`}>
				{isTarget && (
					<Handle
						type="target"
						id={`${id}-handle`}
						position={Position.Left}
						className={cn(
							`!w-3 !h-3 absolute !-left-3.5 !bg-yellow-500`
						)}
					/>
				)}
				{isSource && (
					<Handle
						type="source"
						id={`${id}-source`}
						position={Position.Right}
						className={cn(
							`!w-3 !h-3 absolute !-right-3.5 !bg-yellow-500`
						)}
					/>
				)}
				<Label className={`text-sm`}>
					{label}{" "}
					{required && <span className={`text-red-500`}>*</span>}
				</Label>
				<Input
					type="number"
					className={`bg-accent spin-in-0`}
					value={value as string}
					onChange={handleInputChange}
				/>
				{helperText && (
					<Label className={`text-xs pl-1 text-white/20`}>
						{helperText}
					</Label>
				)}
			</div>
		</>
	);
};

export default NumberInputNode;
