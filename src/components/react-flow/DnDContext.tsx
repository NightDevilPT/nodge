import { createContext, useContext, useState, ReactNode } from 'react';

type DnDContextType = [string | null, (type: string | null) => void];
interface DnDProviderProps {
  children: ReactNode;
}
const DnDContext = createContext<DnDContextType>([null, () => {}]);

export const DnDProvider: React.FC<DnDProviderProps> = ({ children }) => {
  const [type, setType] = useState<string | null>(null);

  return (
    <DnDContext.Provider value={[type, setType]}>
      {children}
    </DnDContext.Provider>
  );
};

export default DnDContext;

export const useDnD = (): DnDContextType => {
  return useContext(DnDContext);
};
