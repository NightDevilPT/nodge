import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getStraightPath,
  useReactFlow,
  EdgeProps,
  getSmoothStepPath,
} from '@xyflow/react';
import { FaPlus } from 'react-icons/fa';

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
  const { setEdges } = useReactFlow();
  
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
            // Remove the edge when the delete button is clicked
            setEdges((edges) => edges.filter((e) => e.id !== id));
          }}
        >
          delete
        </button>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
