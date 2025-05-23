"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
	ThemeProvider as NextThemesProvider,
	useTheme as useNextTheme,
} from "next-themes";

export enum ThemeMode {
	LIGHT = "light",
	DARK = "dark",
}

export enum ThemeColor {
	DEFAULT = "default",
	VIOLET = "violet",
	ROSE = "rose",
	BLUE = "blue",
	ORANGE = "orange",
}

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultMode?: ThemeMode;
	defaultColor?: ThemeColor;
	storageKey?: string;
};

type ThemeContextType = {
	theme: ThemeMode;
	color: ThemeColor;
	setTheme: (theme: ThemeMode) => void;
	setColor: (color: ThemeColor) => void;
};

const ThemeContext = createContext<ThemeContextType>({
	theme: ThemeMode.LIGHT,
	color: ThemeColor.DEFAULT,
	setTheme: () => null,
	setColor: () => null,
});

export function ThemeProvider({
	children,
	defaultMode = ThemeMode.LIGHT,
	defaultColor = ThemeColor.DEFAULT,
	storageKey = "ui-theme",
	...props
}: ThemeProviderProps) {
	const [color, setColor] = useState<ThemeColor>(() => {
		if (typeof window !== "undefined") {
			return (
				(localStorage.getItem(`${storageKey}-color`) as ThemeColor) ||
				defaultColor
			);
		}
		return defaultColor;
	});

	useEffect(() => {
		const root = document.documentElement;

		// Remove all color theme classes
		Object.values(ThemeColor).forEach((themeColor) => {
			root.classList.remove(`theme-${themeColor.toLowerCase()}`);
		});

		// Add current color theme class if not default
		if (color !== ThemeColor.DEFAULT) {
			root.classList.add(`theme-${color.toLowerCase()}`);
		}

		localStorage.setItem(`${storageKey}-color`, color);
	}, [color, storageKey]);

	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme={defaultMode}
			enableSystem
			storageKey={`${storageKey}-mode`}
			{...props}
		>
			<ThemeContextProvider
				storageKey={storageKey}
				defaultMode={defaultMode}
				color={color}
				setColor={setColor}
			>
				{children}
			</ThemeContextProvider>
		</NextThemesProvider>
	);
}

function ThemeContextProvider({
	children,
	storageKey,
	defaultMode,
	color,
	setColor,
}: {
	children: React.ReactNode;
	storageKey: string;
	defaultMode: ThemeMode;
	color: ThemeColor;
	setColor: (color: ThemeColor) => void;
}) {
	const { theme, setTheme } = useNextTheme();

	const contextValue = {
		theme: (theme as ThemeMode) || defaultMode,
		color,
		setTheme: (mode: ThemeMode) => setTheme(mode),
		setColor,
	};

	return (
		<ThemeContext.Provider value={contextValue}>
			{children}
		</ThemeContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};
