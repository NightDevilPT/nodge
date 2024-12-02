import React from 'react';
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from '@xyflow/react';
import { useDnD } from '../DnDContext';  // Importing the useDnD hook to interact with the context

// Define the expected props for the CustomEdge component
interface CustomEdgeProps {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}

const CustomEdge: React.FC<CustomEdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}) => {
  // Using the DnDContext's removeEdge function
  const { removeEdge } = useDnD();
  
  // Get the edge path and label position using the helper function
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      {/* Render the base edge */}
      <BaseEdge id={id} path={edgePath} />

      {/* Render the delete button at the calculated label position */}
      <EdgeLabelRenderer>
        <button
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
          onClick={() => {
            // Use the removeEdge function from context to delete the edge
            removeEdge(id);
          }}
        >
          delete
        </button>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
