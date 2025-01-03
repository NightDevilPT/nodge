"use client";

import React, { useCallback, useRef } from "react";
import {
	addEdge,
	Background,
	BackgroundVariant,
	ColorMode,
	Connection,
	Controls,
	MiniMap,
	ReactFlow,
	useNodesState,
	useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { AppNode, NodeTypesEnum } from "../interface";
import { CreateNode } from "../nodes/node-registry";
import NodeComponent from "../nodes/custom-node";
import DeletableEdge from "../edge/custom-edge";
import { useTheme } from "next-themes";

const snapGrid: [number, number] = [20, 20];

const nodeTypes = {
	FlowScrap: NodeComponent,
};

const edgeTypes = {
	default: DeletableEdge,
};

const FlowEditor = () => {
	const { theme } = useTheme();
	const reactFlowWrapper = useRef(null);
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
			const newNode: AppNode = CreateNode(taskType as NodeTypesEnum);
			newNode.position = position;

			setNodes((nds) => nds.concat(newNode));
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
				className="react-flow"
				ref={reactFlowWrapper}
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				snapGrid={snapGrid}
				onDrop={onDrop}
				onDragOver={onDragOver}
				onConnect={onConnect}
				nodeTypes={nodeTypes}
				edgeTypes={edgeTypes}
				colorMode={theme as ColorMode}
			>
				<Controls />
				<MiniMap />
				<Background variant={BackgroundVariant.Dots} gap={12} />
			</ReactFlow>
		</React.Fragment>
	);
};

export default FlowEditor;
