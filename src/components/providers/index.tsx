"use client";

import React from "react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "../ui/toaster";

const RootProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider attribute="class" defaultTheme="light">
			{children}
			<Toaster />
		</ThemeProvider>
	);
};

export default RootProvider;
