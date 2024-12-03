import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Node, Edge, useEdgesState, useNodesState } from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';

// Define the type of the data each node will carry
interface CustomNodeData {
  label: string;
}

// DnDContextType that defines the context structure
type DnDContextType = {
  type: string | null;
  setType: (type: string | null) => void;
  nodes: Node[]; // Correctly typed node array
  edges: Edge[]; // Correctly typed edge array
  addNode: (type: string, position: { x: number, y: number }) => void;
  removeNode: (id: string) => void;
  addEdge: (edge: Edge) => void;
  removeEdge: (id: string) => void;
  onNodesChange: (changes: any) => void; // Add type for onNodesChange
  onEdgesChange: (changes: any) => void;
};

interface DnDProviderProps {
  children: ReactNode;
}

// Create context with an undefined initial value
const DnDContext = createContext<DnDContextType | undefined>(undefined);

// Provider component to wrap the children and provide context values
export const DnDProvider: React.FC<DnDProviderProps> = ({ children }) => {
  const [type, setType] = useState<string | null>(null);

  // Explicitly define the types for nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]); // Correct type for nodes
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]); // Correct type for edges

  // Function to add a node
  const addNode = useCallback((type: string, position: { x: number, y: number }) => {
    const newNode = {
      id: uuidv4(), // Unique identifier
      type,
      position,
      data: { label: `${type} Node` }, // Custom data for the node
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  }, [setNodes]);

  // Function to remove a node
  const removeNode = useCallback((id: string) => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
  }, [setNodes]);

  // Function to add an edge
  const addEdge = useCallback((edge: Edge) => {
    setEdges((prevEdges) => [...prevEdges, edge]);
  }, [setEdges]);

  // Function to remove an edge
  const removeEdge = useCallback((id: string) => {
    setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== id));
  }, [setEdges]);

  return (
    <DnDContext.Provider value={{ type, setType, nodes, edges, addNode, removeNode, addEdge, removeEdge,onNodesChange,onEdgesChange }}>
      {children}
    </DnDContext.Provider>
  );
};

// Custom hook to access the DnD context
export const useDnD = (): DnDContextType => {
  const context = useContext(DnDContext);
  if (!context) {
    throw new Error('useDnD must be used within a DnDProvider');
  }
  return context;
};

export default DnDContext;
