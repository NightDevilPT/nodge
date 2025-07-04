import '@xyflow/react/dist/style.css';
import "./globals.css";

import type { Metadata } from "next";
import RootProvider from "@/components/providers";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
	title: "NodeFlow",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={``}>
				<RootProvider>
					{children}
				</RootProvider>
				<SpeedInsights />
			</body>
		</html>
	);
}
