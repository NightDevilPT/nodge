import React from 'react';
import { IoClose } from "react-icons/io5";
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
          className="nodrag nopan w-4 h-4 rounded-md bg-gray-300 text-gray-500"
          onClick={() => {
            removeEdge(id);
          }}
        >
          <IoClose className='w-full h-full' />
        </button>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
