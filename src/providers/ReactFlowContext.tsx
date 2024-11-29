"use client"

import { Edge, Node } from '@xyflow/react';
import React, { createContext, useContext, useState } from 'react';

type FlowContextType = {
  nodes: Node[];
  edges: Edge[];
  addNode: (node: Node) => void;
  removeNode: (nodeId: string) => void;
  updateNode: (nodeId: string, newData: any) => void;
  addEdge: (edge: Edge) => void;
  removeEdge: (edgeId: string) => void;
};

const ReactFlowContext = createContext<FlowContextType | undefined>(undefined);

export const ReactFlowProvider = ({ children }: { children: React.ReactNode }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const addNode = (node: Node) => setNodes((prev) => [...prev, node]);
  const removeNode = (nodeId: string) => setNodes((prev) => prev.filter((node) => node.id !== nodeId));
  const updateNode = (nodeId: string, newData: any) => {
    setNodes((prev) => prev.map((node) => (node.id === nodeId ? { ...node, data: newData } : node)));
  };
  const addEdge = (edge: Edge) => setEdges((prev) => [...prev, edge]);
  const removeEdge = (edgeId: string) => setEdges((prev) => prev.filter((edge) => edge.id !== edgeId));

  return (
    <ReactFlowContext.Provider value={{ nodes, edges, addNode, removeNode, updateNode, addEdge, removeEdge }}>
      {children}
    </ReactFlowContext.Provider>
  );
};

export const useReactFlowContext = () => {
  const context = useContext(ReactFlowContext);
  if (!context) throw new Error("useReactFlowContext must be used within a ReactFlowProvider");
  return context;
};
