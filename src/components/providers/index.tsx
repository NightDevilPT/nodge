"use client";

import React from "react";
import { ThemeProvider } from "./theme-provider";

const RootProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider attribute="class" defaultTheme="light">
			{children}
		</ThemeProvider>
	);
};

export default RootProvider;
