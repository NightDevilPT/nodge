import React, { DragEvent } from 'react';
import { useDnD } from './DnDContext';
import { NodeType, InputNode, DefaultNode, OutputNode } from './nodes';
import { FaPlug, FaRegPlayCircle, FaArrowCircleRight } from 'react-icons/fa'; // Import icons from react-icons

const DragAndDropComponent: React.FC = () => {
  const [_, setType] = useDnD();

  // onDragStart function with typed parameters
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: NodeType): void => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const nodeTypes = [
    { type: 'input', label: 'Input Node', icon: <FaPlug />, component: <InputNode /> },
    { type: 'default', label: 'Default Node', icon: <FaRegPlayCircle />, component: <DefaultNode /> },
    { type: 'output', label: 'Output Node', icon: <FaArrowCircleRight />, component: <OutputNode /> },
  ];

  return (
    <div className="w-full h-full flex justify-start items-center gap-4">
      {nodeTypes.map((node) => (
        <div
          key={node.type}
          className="px-3 py-1 flex items-center gap-2 rounded-md bg-white border-2 border-slate-200 text-slate-700 cursor-pointer"
          onDragStart={(event) => onDragStart(event, node.type as NodeType)}
          draggable
        >
          <span className="text-sm">{node.icon}</span> {/* Display the icon */}
          <span className="text-sm">{node.label}</span> {/* Display the label */}
        </div>
      ))}
    </div>
  );
};

export default DragAndDropComponent;
