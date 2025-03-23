import React from "react";
import { useReactFlow } from "@xyflow/react";

import {
	AppNode,
	AppNodeData,
	InputProps,
} from "@/components/reactflow/interface";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateNodeData } from "@/hooks/update-node-data";
import { NodgeHandle, NodgeType } from "@/components/shared/nodge-handle";

const NumberInput = ({ nodeId, input }: InputProps) => {
	const { label, placeholder } = input;
	const { getNode } = useReactFlow();
	const updateNodeData = useUpdateNodeData();
	const currentNode = getNode(nodeId) as AppNode | undefined;
	if (!currentNode) return null;

	// Updates node data when input value changes
	const handleInputChange = (value: string) => {
		const nodeData = currentNode?.data as AppNodeData;
		if (nodeData) {
			const updatedInputs = nodeData.inputs?.map((item) =>
				item.id === input.id ? { ...item, value } : item
			);
			updateNodeData(nodeId, { ...nodeData, inputs: updatedInputs });
		}
	};

	return (
		<div className="w-full h-auto flex justify-start items-start flex-col gap-2 relative">
			<Label>{label}</Label>
			<Input
				type={"number"}
				defaultValue={input.value as string}
				onChange={(event) => handleInputChange(event?.target.value)}
				placeholder={placeholder}
			/>
			{input.isShowSource && (
				<NodgeHandle
					nodeId={nodeId}
					isConnectable
					type={NodgeType.source}
				/>
			)}
			{input.isShowTarget && (
				<NodgeHandle
					nodeId={nodeId}
					isConnectable
					type={NodgeType.target}
				/>
			)}
		</div>
	);
};

export default NumberInput;
