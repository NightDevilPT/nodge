"use client";

import React from "react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "../ui/toaster";
import { ViewProvider } from "./view-layout-provider";

const RootProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider>
			<ViewProvider>{children}</ViewProvider>
			<Toaster />
		</ThemeProvider>
	);
};

export default RootProvider;
