import { useReactFlow } from "@xyflow/react";
import { useDebounce } from "./use-debounce";
import { AppNodeData } from "@/components/reactflow/interface";

export const useUpdateNodeData = () => {
	const { setNodes } = useReactFlow();
	
	const debouncedUpdate = useDebounce((id: string, newData: Partial<AppNodeData>) => {
		setNodes((prevNodes) => {
			const updatedNodes = prevNodes.map((node) => {
				if (node.id === id) {
					const updatedNode = { ...node, ...newData };
					console.log("Updating Node:", id, {
						previous: node,
						updated: updatedNode
					});
					return updatedNode;
				}
				return node;
			});
			console.log("Final Updated Nodes:", updatedNodes);
			return updatedNodes;
		});
	}, 500); // Adjust debounce delay as needed

	return debouncedUpdate;
};
