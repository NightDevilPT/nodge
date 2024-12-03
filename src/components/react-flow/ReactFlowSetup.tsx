"use client"

import React, { useRef, useCallback } from "react";
import { ReactFlow, Controls, Background, ReactFlowProvider, useReactFlow } from "@xyflow/react";
import CustomEdge from "./edges/CustomEdge";
import { DnDProvider, useDnD } from "./DnDContext";
import DragAndDropComponent from "./ToolbarUI";

const DnDFlow: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const { nodes, edges, addNode, removeNode, addEdge, removeEdge, type,onNodesChange,onEdgesChange } = useDnD();
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback((params) => {
    const edge = { ...params, type: "custom" };
    addEdge(edge);
  }, [addEdge]);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      addNode(type, position);
    },
    [screenToFlowPosition, type, addNode]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

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
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          snapGrid={[30, 30]}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          edgeTypes={{
            custom: (props) => <CustomEdge {...props} removeEdge={removeEdge} />,
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
