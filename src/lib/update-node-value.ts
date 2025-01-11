// utils/nodeHelpers.ts
import { Node } from "@xyflow/react";

import { AppNodeData, NodeInputProps } from "@/components/reactflow/interface";

export const updateNodeInputValue = (
	nodeId: string,
	inputId: string,
	newValue: string | number | object | null,
	getNode: (id: string) => Node | undefined,
	updateNode: (id: string, node: Node) => void
) => {
	const node = getNode(nodeId); // Get the current node
	if (node) {
		const nodeData = node.data as AppNodeData;
		const inputs = nodeData.inputs as NodeInputProps[];

		// Find the input with the matching ID
		const findInputIndex = inputs.findIndex(
			(input) => input.id === inputId
		);
		if (findInputIndex > -1) {
			// Update the input value
			inputs[findInputIndex] = {
				...inputs[findInputIndex],
				value: newValue,
			};

			// Update the node with the modified inputs
			updateNode(nodeId, {
				...node,
				data: {
					...nodeData,
					inputs: [...inputs],
				},
			});
		}
	}
};
