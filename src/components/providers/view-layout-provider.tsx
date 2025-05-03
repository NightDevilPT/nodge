"use client";

import { createContext, useContext, useState, useEffect } from "react";

export enum ViewEnum {
  TABLE = "table",
  GRID = "grid",
}

type ViewContextType = {
  view: ViewEnum;
  toggleView: () => void;
  setView: (view: ViewEnum) => void;
};

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export function ViewProvider({ children }: { children: React.ReactNode }) {
  const [view, setViewState] = useState<ViewEnum>(ViewEnum.TABLE);

  // Initialize view from localStorage
  useEffect(() => {
    const storedView = localStorage.getItem("workflow-view") as ViewEnum;
    if (storedView && Object.values(ViewEnum).includes(storedView)) {
      setViewState(storedView);
    }
  }, []);

  const setView = (newView: ViewEnum) => {
    setViewState(newView);
    localStorage.setItem("workflow-view", newView);
  };

  const toggleView = () => {
    const newView = view === ViewEnum.TABLE ? ViewEnum.GRID : ViewEnum.TABLE;
    setView(newView);
  };

  return (
    <ViewContext.Provider value={{ view, toggleView, setView }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error("useView must be used within a ViewProvider");
  }
  return context;
}