import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Node } from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';

type DnDContextType = {
  type: string | null;
  setType: (type: string | null) => void;
  nodes: Node[];
  edges: any[];
  addNode: (type: string, position: { x: number, y: number }) => void;
  removeNode: (id: string) => void;
  addEdge: (edge: any) => void;
  removeEdge: (id: string) => void;
};

interface DnDProviderProps {
  children: ReactNode;
}

const DnDContext = createContext<DnDContextType | undefined>(undefined);

export const DnDProvider: React.FC<DnDProviderProps> = ({ children }) => {
  const [type, setType] = useState<string | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<any[]>([]);

  const addNode = useCallback((type: string, position: { x: number, y: number }) => {
    const newNode = {
      id: uuidv4(),
      type,
      position,
      data: { label: `${type} Node` },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  }, []);

  const removeNode = useCallback((id: string) => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
  }, []);

  const addEdge = useCallback((edge: any) => {
    setEdges((prevEdges) => [...prevEdges, edge]);
  }, []);

  const removeEdge = useCallback((id: string) => {
    setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== id));
  }, []);

  return (
    <DnDContext.Provider value={{ type, setType, nodes, edges, addNode, removeNode, addEdge, removeEdge }}>
      {children}
    </DnDContext.Provider>
  );
};

export const useDnD = (): DnDContextType => {
  const context = useContext(DnDContext);
  if (!context) {
    throw new Error('useDnD must be used within a DnDProvider');
  }
  return context;
};

export default DnDContext;
