import { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";

const useUpdateNodeData = () => {
	const reactFlowInstance = useReactFlow();

	const updateNodeData = useCallback(
		(id: string, newData: Partial<any>) => {
			reactFlowInstance.setNodes((nodes) =>
				nodes.map((node) =>
					node.id === id
						? { ...node, data: { ...node.data, ...newData } }
						: node
				)
			);
		},
		[reactFlowInstance]
	);

	return updateNodeData;
};

export default useUpdateNodeData;
