import React from "react";
import { MdDelete, MdDragIndicator } from "react-icons/md";
import { IoIosCopy } from "react-icons/io";

import { cn } from "@/lib/utils";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { useReactFlow } from "@xyflow/react";

type NodeHeaderProps = {
	nodeId: string;
	iconColor: string;
	icon: React.ElementType;
	label: string;
};

const NodeHeader = ({
	nodeId,
	label,
	icon: Icon,
	iconColor,
}: NodeHeaderProps) => {
	const { getNodes, setNodes } = useReactFlow();

	const handleDeleteNode = () => {
		const updatedNodes = getNodes().filter((node) => node.id !== nodeId);
		setNodes(updatedNodes);
	};

	return (
		<CardHeader className={cn(`p-0 w-full`)}>
			<CardTitle
				className={cn(
					`p-0 w-full flex justify-between items-center gap-3`
				)}
			>
				<div className={`flex justify-center items-center gap-2`}>
					<Icon className={iconColor} size={24} />
					<span className={`p-0`}>{label}</span>
				</div>
				<div
					className={`w-auto h-auto flex justify-center items-center gap-2`}
				>
					<button className={`w-5 h-5`}>
						<IoIosCopy className={`w-4 h-4 text-green-400`} />
					</button>
					<button className={`w-5 h-5`} onClick={handleDeleteNode}>
						<MdDelete className={`w-5 h-5 text-red-400`} />
					</button>
					<button
						className={`w-5 h-5 cursor-grab drag-handle__custom`}
					>
						<MdDragIndicator
							className={`w-5 h-5 text-card-foreground`}
						/>
					</button>
				</div>
			</CardTitle>
		</CardHeader>
	);
};

export default NodeHeader;
