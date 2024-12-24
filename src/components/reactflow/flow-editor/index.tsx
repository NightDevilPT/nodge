"use client";

import React, { useCallback } from "react";
import {
	addEdge,
	Background,
	BackgroundVariant,
	Connection,
	Controls,
	MiniMap,
	ReactFlow,
	useNodesState,
	useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { AppNode, NodeTypesEnum } from "../interface";
import { getUniqueId } from "@/lib/utils";

const snapGrid: [number, number] = [50, 50];

const FlowEditor = () => {
	const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
	const [edges, setEdges, onEdgesChange] = useNodesState([]);
	const { screenToFlowPosition } = useReactFlow();

	const onDragOver = useCallback((event: React.DragEvent) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	}, []);

	const onDrop = useCallback(
		(event: React.DragEvent) => {
			event.preventDefault();
			const taskType = event.dataTransfer.getData(
				"application/reactflow"
			);

			const position = screenToFlowPosition({
				x: event.clientX,
				y: event.clientY,
			});
			const newNode = {
				id: getUniqueId(),
				type: taskType as NodeTypesEnum,
				position,
				data: { label: `${taskType} node` },
			};

			setNodes((nds) => nds.concat(newNode));
			// setType(null);
		},
		[screenToFlowPosition]
	);

	const onConnect = useCallback(
		(params: Connection) => setEdges((eds) => addEdge(params, eds)),
		[]
	);

	return (
		<React.Fragment>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				snapGrid={snapGrid}
				onDrop={onDrop}
				onDragOver={onDragOver}
				onConnect={onConnect}
			/>
			<Controls />
			<Background variant={BackgroundVariant.Dots} gap={12} />
			<MiniMap />
		</React.Fragment>
	);
};

export default FlowEditor;
