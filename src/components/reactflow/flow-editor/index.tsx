"use client";

import { useTheme } from "next-themes";
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
import React, { useCallback, useRef } from "react";
import {
	NodeRegistry,
	NodeTypeDefination,
} from "../nodes/custom-nodes/node-registry";
import DeletableEdge from "../edge/custom-edge";
import { AppNode, NodeTypesEnum } from "../interface";

const snapGrid: [number, number] = [20, 20];

const edgeTypes = {
	default: DeletableEdge,
};

const FlowEditor = () => {
	const { theme } = useTheme();
	const reactFlowWrapper = useRef(null);
	const { screenToFlowPosition } = useReactFlow();
	const [edges, setEdges, onEdgesChange] = useNodesState([]);
	const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);

	const onDragOver = useCallback((event: React.DragEvent) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	}, []);

	const onDrop = useCallback(
		(event: React.DragEvent) => {
			event.preventDefault();
			const taskType = event.dataTransfer.getData(
				"application/reactflow"
			) as NodeTypesEnum;

			// Validate node type
			if (!NodeRegistry[taskType]) {
				console.error(`Unknown node type: ${taskType}`);
				return;
			}

			const position = screenToFlowPosition({
				x: event.clientX,
				y: event.clientY,
			});

			// Get default node data from NodeRegistry
			const nodeConfig = NodeRegistry[taskType];
			const nodeId = crypto.randomUUID();
			const newNode: AppNode = {
				id: `${taskType}:${nodeId}`,
				type: taskType,
				position,
				data: nodeConfig.data,
			};
			setNodes((nds) => [...nds, newNode]);
		},
		[screenToFlowPosition, setNodes]
	);

	const onConnect = useCallback((params: Connection) => {
		const { target, source } = params;
		// Prevent connection if source and target are the same
		if (source === target) {
			console.warn("Cannot connect a node to itself!");
			return;
		}
		setEdges((eds) => addEdge(params, eds));
	}, []);

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
				nodeTypes={NodeTypeDefination}
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
