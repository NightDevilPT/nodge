import React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { updateNodeInputValue } from "@/lib/update-node-value";
import { NodeInputProps } from "@/components/reactflow/interface";

const TextInput = ({
	nodeId,
	input,
}: {
	input: NodeInputProps;
	nodeId: string;
}) => {
	const {
		id,
		name,
		label,
		required,
		helperText,
		value,
		inputType,
		isTarget,
		isSource,
	} = input;
	const { getNode, updateNode } = useReactFlow();

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateNodeInputValue(
			nodeId,
			id as string,
			event.target.value,
			getNode,
			updateNode
		);
	};

	return (
		<div className={`w-full h-auto grid grid-cols-1 gap-1 relative`}>
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
			<Input
				type="text"
				name={name}
				value={value as string}
				onChange={handleInputChange}
			/>
			{helperText && (
				<Label className="pl-2 text-xs text-gray-500">
					{helperText}
				</Label>
			)}
		</div>
	);
};

export default TextInput;
