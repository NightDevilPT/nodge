"use client"

// components/FlowComponent.tsx
import React, { useState, useCallback } from 'react';
import ReactFlow, { Controls, Background, Node, Edge, addEdge } from 'react-flow-renderer';
import { v4 as uuidv4 } from 'uuid'; // Importing uuid to generate unique IDs
import { nodeTypes } from '../nodes';

const FlowComponent = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  // Handle node drop event
  const onNodeDrop = useCallback(
    (event: React.DragEvent) => {
      const newNode = {
        id: uuidv4(), // Generate a unique ID for the new node
        type: event.dataTransfer.getData('type'), // Get the type of the node being dragged
        position: { x: event.clientX - 100, y: event.clientY - 50 }, // Position based on the mouse click
        data: { label: `Node`, info: `This is a new node` },
      };
      setNodes((prevNodes) => [...prevNodes, newNode]); // Add the new node to the state
    },
    []
  );

  // Handle edge connections
  const onConnect = useCallback((params: any) => {
    setEdges((eds) => addEdge(params, eds)); // Add edge to the state
  }, []);

  return (
    <div
      onDrop={onNodeDrop}
      onDragOver={(e) => e.preventDefault()}
      style={{ flex: 1, height: '100vh', backgroundColor: '#fff' }}
    >
      <ReactFlow
        nodes={nodes} // Pass nodes state to ReactFlow
        edges={edges} // Pass edges state to ReactFlow
        onConnect={onConnect} // Handle new edge connections
        nodeTypes={nodeTypes} // Define custom node types
        fitView
      >
        <Controls /> {/* Add controls for zooming and panning */}
        <Background /> {/* Add background grid */}
      </ReactFlow>
    </div>
  );
};

export default FlowComponent;
