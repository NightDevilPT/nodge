import React, { ReactNode } from "react";
import { useReactFlow } from "@xyflow/react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { NodeRegistry } from "../custom-nodes/node-registry";
import { AppNode, NodeHeaderProps, NodeTypesEnum } from "../../interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface BaseNodeProps {
	children: ReactNode;
	header: NodeHeaderProps;
	nodeId: string;
}

const BaseNode = ({ header, children, nodeId }: BaseNodeProps) => {
	const {
		label,
		copy: { isCopy, copyIcon: CopyIcon },
		dlt: { isDelete, deleteIcon: DeleteIcon },
		info: InfoComponent,
	} = header;
	const { getNodes, setNodes, getNode } = useReactFlow();

	const handleDeleteNode = () => {
		const updatedNodes = getNodes().filter((node) => node.id !== nodeId);
		setNodes(updatedNodes);
	};

	const handleCopyNode = () => {
		const currentNodeType = getNode(nodeId as string)?.data;
		// Get default node data from NodeRegistry
		if (currentNodeType) {
			const nodeConfig =
				NodeRegistry[currentNodeType.type as NodeTypesEnum];
			const nodeId = crypto.randomUUID();
			const newNode: AppNode = {
				id: `${currentNodeType.type}:${nodeId}`,
				type: currentNodeType.type as NodeTypesEnum,
				position: {
					x: 10,
					y: 10,
				},
				data: nodeConfig.data,
			};
			setNodes((nds) => nds.concat(newNode));
		}
	};

	return (
		<Card className={cn(`px-3 py-2.5 space-y-2 rounded-md min-w-80`)}>
			<CardHeader className={cn(`p-0`)}>
				<CardTitle
					className={cn(` flex justify-between items-center gap-2`)}
				>
					<div className={`flex justify-center items-center gap-2`}>
						<h3>{label}</h3>
						{InfoComponent && <InfoComponent className="text-red-500" />}
					</div>
					<div className={`flex justify-center items-center gap-2`}>
						{isCopy && CopyIcon && (
							<div onClick={handleCopyNode}>
								<CopyIcon
									className={`w-4 h-4 text-green-400`}
								/>
							</div>
						)}
						{isDelete && DeleteIcon && (
							<div onClick={handleDeleteNode}>
								<DeleteIcon
									className={`w-4 h-4 text-red-400`}
								/>
							</div>
						)}
					</div>
				</CardTitle>
			</CardHeader>
			<Separator orientation="horizontal" className={cn(`my-1`)} />
			<CardContent className={`p-0`}>{children}</CardContent>
		</Card>
	);
};

export default BaseNode;
