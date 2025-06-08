"use client";

import { createContext, useContext, useState, useEffect } from "react";

export enum ViewEnum {
	TABLE = "table",
	GRID = "grid",
}

export enum SidebarEnum {
	ICON = "icon",
	ICON_TEXT = "icon-text",
}

type ViewContextType = {
	view: ViewEnum;
	sideBarView: SidebarEnum;
	toggleView: () => void;
	setView: (view: ViewEnum) => void;
	toggleSidebarView: (view: SidebarEnum) => void;
};

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export function ViewProvider({ children }: { children: React.ReactNode }) {
	const [view, setViewState] = useState<ViewEnum>(ViewEnum.TABLE);
	const [sideBarView, setSidebarView] = useState<SidebarEnum>(
		SidebarEnum.ICON_TEXT
	);

	// Initialize view from localStorage
	useEffect(() => {
		const storedView = localStorage.getItem("workflow-view") as ViewEnum;
		const storedSidebarView = localStorage.getItem(
			"sidebar-view"
		) as SidebarEnum;
		if (storedView && Object.values(ViewEnum).includes(storedView)) {
			setViewState(storedView);
		}

		if (
			storedSidebarView &&
			Object.values(SidebarEnum).includes(storedSidebarView)
		) {
			setSidebarView(storedSidebarView);
		}
	}, []);

	const setView = (newView: ViewEnum) => {
		setViewState(newView);
		localStorage.setItem("workflow-view", newView);
	};

	const toggleView = () => {
		const newView =
			view === ViewEnum.TABLE ? ViewEnum.GRID : ViewEnum.TABLE;
		setView(newView);
	};

	const toggleSidebarView = (newSidebarView: SidebarEnum) => {
		setSidebarView(newSidebarView);
		localStorage.setItem("sidebar-view", newSidebarView);
	};

	return (
		<ViewContext.Provider
			value={{
				view,
				toggleView,
				setView,
				sideBarView,
				toggleSidebarView,
			}}
		>
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
