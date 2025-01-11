import React from "react";
import { useReactFlow } from "@xyflow/react";
import { NodeHeaderProps } from "../../interface";
import { MdOutlineDragIndicator } from "react-icons/md";

import { CardHeader, CardTitle } from "@/components/ui/card";

const NodeHeader = ({
	nodeId,
	label,
	isCopy,
	iconColor,
	isDelete,
	icon: Icon,
	copyIcon: CopyIcon,
	deleteIcon: DeleteIcon,
}: NodeHeaderProps) => {
	const { getNodes, setNodes } = useReactFlow();

	const handleDeleteNode = () => {
		const updatedNodes = getNodes().filter((node) => node.id !== nodeId);
		setNodes(updatedNodes);
	};

	return (
		<CardHeader className={`p-0 px-3`}>
			<CardTitle className={`p-0 flex justify-between items-center`}>
				<div
					className={`w-auto flex justify-center items-center gap-3`}
				>
					<Icon className={`w-5 h-5 ${iconColor}`} />
					<h3>{label}</h3>
				</div>

				<div
					className={`w-auto flex justify-center items-center gap-2`}
				>
					{isCopy && CopyIcon && (
						<button className={`w-4 h-4 `}>
							<CopyIcon
								className={`text-green-500 w-full h-full`}
							/>
						</button>
					)}
					{isDelete && DeleteIcon && (
						<button
							className={`w-5 h-5 `}
							onClick={handleDeleteNode}
						>
							<DeleteIcon
								className={`text-red-400 w-full h-full`}
							/>
						</button>
					)}
					<button
						className={`w-5 h-5 drag-handle__custom cursor-grab`}
					>
						<MdOutlineDragIndicator
							className={`text-foreground w-full h-full`}
						/>
					</button>
				</div>
			</CardTitle>
		</CardHeader>
	);
};

export default NodeHeader;
