// hooks/useUpdateNodeData.ts
import { useReactFlow } from "@xyflow/react";
import { AppNodeData } from "@/components/reactflow/interface";

export const useUpdateNodeData = () => {
	const { setNodes } = useReactFlow();

	const updateNodeData = (id: string, newData: Partial<AppNodeData>) => {
		setNodes((nodes) =>
			nodes.map((node) =>
				node.id === id
					? { ...node, data: { ...node.data, ...newData } }
					: node
			)
		);
	};

	return updateNodeData;
};
