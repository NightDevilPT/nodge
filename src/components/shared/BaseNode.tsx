import React, { useCallback } from 'react';
import { Handle, Position, NodeProps, Connection } from '@xyflow/react'; // ReactFlow handles
import { v4 as uuidv4 } from 'uuid';

interface HandleConfig {
  id: string;
  position: Position;
  isConnectable: boolean;
}

interface BaseNodeProps extends NodeProps {
  onConnect: (connection: Connection) => void; // Callback for handling connection
  handles: {
    source: HandleConfig[]; // Source handles configuration
    target: HandleConfig[]; // Target handles configuration
  };
  children: React.ReactNode; // Rendered content inside the BaseNode
  data: {
    label: string;
  };
}

const BaseNode: React.FC<BaseNodeProps> = ({ onConnect, handles, data, children }) => {
  const handleConnect = useCallback(
    (connection: Connection) => {
      if (connection.source === connection.target) {
        alert('You cannot connect a node to itself!');
        return;
      }
      onConnect(connection); // Trigger the parent's callback
    },
    [onConnect]
  );

  return (
    <div className="base-node px-4 py-2 rounded-md bg-gray-200 text-slate-700 relative">
      <div className="node-label text-center text-lg font-semibold mb-2">
        {data?.label || 'Base Node'}
      </div>
      <div className="node-content">{children}</div>

      {handles.source.map((handle) => (
        <Handle
          key={handle.id}
          id={handle.id}
          type="source"
          position={handle.position}
          isConnectable={handle.isConnectable}
          onConnect={handleConnect}
        />
      ))}

      {handles.target.map((handle) => (
        <Handle
          key={handle.id}
          id={handle.id}
          type="target"
          position={handle.position}
          isConnectable={handle.isConnectable}
          onConnect={handleConnect}
        />
      ))}
    </div>
  );
};

export default BaseNode;
