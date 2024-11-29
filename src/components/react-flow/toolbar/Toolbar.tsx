"use client"
// components/Toolbar.tsx


import React from 'react';
import { useDrag } from 'react-dnd';

const NodeItem = ({ type, label }: { type: string, label: string }) => {
  // Use the `useDrag` hook to make the node draggable
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'NODE', // The type of the draggable item
    item: { type, label },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // Collect drag state
    }),
  }));

  return (
    <div
      ref={drag as any} // Attach the drag function to the ref of the div
      style={{
        padding: '10px',
        margin: '5px',
        backgroundColor: isDragging ? '#ddd' : '#f0f0f0',
        border: '1px solid #ccc',
        cursor: 'move',
      }}
    >
      {label}
    </div>
  );
};

const Toolbar = () => {
  return (
    <div style={{ width: '200px', padding: '10px', backgroundColor: '#f8f8f8' }}>
      <h3>Node Types</h3>
      <NodeItem type="custom" label="Custom Node" />
      <NodeItem type="default" label="Default Node" />
    </div>
  );
};

export default Toolbar;
