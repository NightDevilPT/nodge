import React from "react";
import { InputTypesEnum, NodeInputProps } from "../../interface";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
	Handle,
	Position,
	useReactFlow,
} from "@xyflow/react";

export interface InputProps extends NodeInputProps {
	nodeId: string;
}

const NodeInput = ({
	label,
	type,
	value,
	helperText,
	required,
	isConnectable,
	id
}: InputProps) => {
	const { getNode } = useReactFlow();
	if (type === InputTypesEnum.OUTPUT) {
		return (
			<div
				className={`w-full h-auto grid grid-cols-1 gap-1 relative rounded-b-md`}
			>
				<Handle
					id={id}
					type={"target"}
					position={Position.Left}
					className={`!w-3 !h-3 !rounded-full !bg-green-500 absolute !-left-3.5`}
				/>
				<Label className={`text-secondary-foreground pb-2`}>
					Output
				</Label>
				<Label
					className={`text-secondary-foreground dark:bg-accent px-3 py-2 rounded-md bg-gray-200`}
				>
					{value}
				</Label>
			</div>
		);
	}

	return (
		<div
			className={`w-full h-auto grid grid-cols-1 gap-1 relative rounded-b-md`}
		>
			<Handle
				type={"target"}
				id={id}
				position={Position.Left}
				className={`!w-3 !h-3 !rounded-full !bg-yellow-400 absolute !-left-3.5`}
				isConnectable={isConnectable}
			/>
			<Label htmlFor={label} className={`text-sm text-foreground`}>
				{label} {required && <span className={`text-red-500`}>*</span>}
			</Label>
			<Input
				type={type}
				id={label}
				placeholder={label}
				className={`text-foreground bg-background`}
			/>
			{helperText && (
				<Label className={`text-xs px-1 text-gray-500`}>
					{helperText}
				</Label>
			)}
		</div>
	);
};

export default NodeInput;
