"use client";

import React, { useRef, useCallback } from "react";
import {
	ReactFlow,
	addEdge,
	type Node,
	type OnConnect,
	useNodesState,
	useEdgesState,
	Controls,
	useReactFlow,
	Background,
	ReactFlowProvider,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import DragAndDropComponent from "./ToolbarUI";
import { DnDProvider, useDnD } from "./DnDContext";
import { v4 as uuidv4 } from "uuid";
import CustomEdge from "./edges/CustomEdge";

// Define NodeData type to satisfy the Record<string, unknown> constraint
interface NodeData extends Record<string, unknown> {
	label: string;
}

// Define the custom Node type
type CustomNode = Node<NodeData>; // Define CustomNode as a Node with NodeData

// Initial nodes with NodeData type
const initialNodes: CustomNode[] = [];

const getId = () => uuidv4();

const DnDFlow: React.FC = () => {
	const reactFlowWrapper = useRef<HTMLDivElement | null>(null);

	// Define the types for nodes and edges
	const [nodes, setNodes, onNodesChange] =
		useNodesState<CustomNode>(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);

	const { screenToFlowPosition } = useReactFlow();
	const [type] = useDnD();

	// Handle new connections between nodes
	const onConnect: OnConnect = useCallback((params) => {
		// Set edge type (solid or dashed) on connection
		const edge = { ...params, type: "custom" }; // Use 'custom' edge type
		setEdges((eds) => addEdge(edge, eds));
	}, []);

	const removeEdge = (edgeId: string) => {
		setEdges((eds) => eds.filter((edge) => edge.id !== edgeId)); // Filter out the edge with the given ID
	};

	const onDragOver = useCallback((event: React.DragEvent) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	}, []);

	const onDrop = useCallback(
		(event: React.DragEvent) => {
			event.preventDefault();

			if (!type) {
				return;
			}

			const position = screenToFlowPosition({
				x: event.clientX,
				y: event.clientY,
			});

			const newNode: CustomNode = {
				id: getId(),
				type,
				position,
				data: { label: `${type} Node` },
			};

			setNodes((nds) => nds.concat(newNode));
		},
		[screenToFlowPosition, type, setNodes]
	);

	return (
		<div
			className="w-full h-full grid grid-rows-[90px,_1fr] rounded-md border-[1px] border-divider"
			ref={reactFlowWrapper}
		>
			<div className="w-full h-[90px] grid grid-rows-[35px,_1fr] border-b-[1px] border-b-divider px-2">
        <div className="w-full flex justify-start items-center gap-5">
          <span className="text-sm font-[500]">Project 1</span>
        </div>
        <DragAndDropComponent />
			</div>
			<div className="w-full flex-1 overflow-auto">
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					onDrop={onDrop}
					onDragOver={onDragOver}
					defaultMarkerColor={"red"}
					snapGrid={[30, 30]}
					edgeTypes={{
						custom: (props) => (
							<CustomEdge {...props} removeEdge={removeEdge} />
						),
					}}
				>
					<Controls />
					<Background />
				</ReactFlow>
			</div>
		</div>
	);
};

const ReactFlowSetup: React.FC = () => (
	<ReactFlowProvider>
		<DnDProvider>
			<DnDFlow />
		</DnDProvider>
	</ReactFlowProvider>
);

export default ReactFlowSetup;
