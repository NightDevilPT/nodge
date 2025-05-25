"use client";

import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import NodgeLayoutSwitch from "@/components/shared/nodge-layout-switch";
import { useView } from "@/components/providers/view-layout-provider";
import { Card, CardContent } from "@/components/ui/card";
import AppearanceSettingSkeleton from "@/components/shared/nodge-skeleton/appearance";
import { Switch } from "@/components/ui/switch";
import {
	ThemeColor,
	ThemeMode,
	useTheme,
} from "@/components/providers/theme-provider";
import { CheckCheck } from "lucide-react";

const ThemeColorCards = {
	DEFAULT: {
		name: "Default",
		color: "bg-[#22c55e]",
		colorPallets: [
			{ name: "Background", color: "bg-[#ffffff]" },
			{ name: "Foreground", color: "bg-[#09090b]" },
			{ name: "Primary", color: "bg-[#22c55e]" },
			{ name: "Card", color: "bg-[#ffffff]" },
			{ name: "Border", color: "bg-[#e4e4e7]" },
			{ name: "Chart1", color: "bg-[#e67c73]" },
			{ name: "Chart2", color: "bg-[#4a9e8b]" },
			{ name: "Chart3", color: "bg-[#2f4e5e]" },
			{ name: "Chart4", color: "bg-[#e0c26b]" },
			{ name: "Chart5", color: "bg-[#e8a46c]" },
		],
	},
	ORANGE: {
		name: "Orange",
		color: "bg-[#f97316]",
		colorPallets: [
			{ name: "Background", color: "bg-[#ffffff]" },
			{ name: "Foreground", color: "bg-[#1c1917]" },
			{ name: "Primary", color: "bg-[#f97316]" },
			{ name: "Card", color: "bg-[#ffffff]" },
			{ name: "Border", color: "bg-[#e7e5e4]" },
			{ name: "Chart1", color: "bg-[#e67c73]" },
			{ name: "Chart2", color: "bg-[#4a9e8b]" },
			{ name: "Chart3", color: "bg-[#2f4e5e]" },
			{ name: "Chart4", color: "bg-[#e0c26b]" },
			{ name: "Chart5", color: "bg-[#e8a46c]" },
		],
	},
	ROSE: {
		name: "Rose",
		color: "bg-[#e11d48]",
		colorPallets: [
			{ name: "Background", color: "bg-[#ffffff]" },
			{ name: "Foreground", color: "bg-[#09090b]" },
			{ name: "Primary", color: "bg-[#e11d48]" },
			{ name: "Card", color: "bg-[#ffffff]" },
			{ name: "Border", color: "bg-[#e4e4e7]" },
			{ name: "Chart1", color: "bg-[#e67c73]" },
			{ name: "Chart2", color: "bg-[#4a9e8b]" },
			{ name: "Chart3", color: "bg-[#2f4e5e]" },
			{ name: "Chart4", color: "bg-[#e0c26b]" },
			{ name: "Chart5", color: "bg-[#e8a46c]" },
		],
	},
	VIOLET: {
		name: "Violet",
		color: "bg-[#8b5cf6]",
		colorPallets: [
			{ name: "Background", color: "bg-[#ffffff]" },
			{ name: "Foreground", color: "bg-[#0f172a]" },
			{ name: "Primary", color: "bg-[#8b5cf6]" },
			{ name: "Card", color: "bg-[#ffffff]" },
			{ name: "Border", color: "bg-[#e2e8f0]" },
			{ name: "Chart1", color: "bg-[#e67c73]" },
			{ name: "Chart2", color: "bg-[#4a9e8b]" },
			{ name: "Chart3", color: "bg-[#2f4e5e]" },
			{ name: "Chart4", color: "bg-[#e0c26b]" },
			{ name: "Chart5", color: "bg-[#e8a46c]" },
		],
	},
	BLUE: {
		name: "Blue",
		color: "bg-[#3b82f6]",
		colorPallets: [
			{ name: "Background", color: "bg-[#ffffff]" },
			{ name: "Foreground", color: "bg-[#052e16]" },
			{ name: "Primary", color: "bg-[#3b82f6]" },
			{ name: "Card", color: "bg-[#ffffff]" },
			{ name: "Border", color: "bg-[#e2e8f0]" },
			{ name: "Chart1", color: "bg-[#e67c73]" },
			{ name: "Chart2", color: "bg-[#4a9e8b]" },
			{ name: "Chart3", color: "bg-[#2f4e5e]" },
			{ name: "Chart4", color: "bg-[#e0c26b]" },
			{ name: "Chart5", color: "bg-[#e8a46c]" },
		],
	},
	// BW: {
	// 	name: "Black & White",
	// 	color: "bg-[#000000]",
	// 	colorPallets: [
	// 		{ name: "Background", color: "bg-[#ffffff]" },
	// 		{ name: "Foreground", color: "bg-[#09090b]" },
	// 		{ name: "Card", color: "bg-[#ffffff]" },
	// 		{ name: "Border", color: "bg-[#e4e4e7]" },
	// 		{ name: "Primary", color: "bg-[#000000]" },
	// 		{ name: "Chart1", color: "bg-[#e67c73]" },
	// 		{ name: "Chart2", color: "bg-[#4a9e8b]" },
	// 		{ name: "Chart3", color: "bg-[#2f4e5e]" },
	// 		{ name: "Chart4", color: "bg-[#e0c26b]" },
	// 		{ name: "Chart5", color: "bg-[#e8a46c]" },
	// 	],
	// },
};

const AppearanceSetting = () => {
	const { theme, setTheme, color: selectedColor, setColor } = useTheme();
	const { view, setView } = useView();
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return <AppearanceSettingSkeleton />;
	}

	return (
		<ScrollArea className="h-full">
			<div className="container mx-auto py-4">
				<Card className="w-full bg-transparent mx-auto pt-4">
					<CardContent className="space-y-4">
						{/* Theme Section */}
						<div className="space-y-4">
							<div>
								<h3 className="text-base font-medium">
									Default Theme
								</h3>
								<p className="text-sm text-muted-foreground">
									Choose your preferred theme style. Switch
									between light and dark theme to customize.
								</p>
							</div>
							<Card className="p-3 px-5 rounded-md grid grid-cols-[1fr_70px]">
								<div className="w-full h-auto grid grid-cols-1 gap-0 place-content-start place-items-start">
									<h3>Theme</h3>
									<span className="text-xs text-muted-foreground">
										Customize how Nodge looks on your
										device. Choose between light or dark
										theme.
									</span>
								</div>
								<div className="flex w-full justify-center items-center space-x-2">
									<Switch
										checked={theme === "dark"}
										onCheckedChange={(checked) =>
											setTheme(
												checked
													? ThemeMode.DARK
													: ThemeMode.LIGHT
											)
										}
										className="data-[state=checked]:bg-primary"
									/>
								</div>
							</Card>
						</div>
						<Separator />
						<div className="space-y-4">
							<div>
								<h3 className="text-base font-medium">
									Default Layout
								</h3>
								<p className="text-sm text-muted-foreground">
									Choose your preferred display style. Switch
									between grid and list views to customize how
									content appears.
								</p>
							</div>

							<Card className="p-4 rounded-lg">
								<div className="flex justify-between items-center">
									<div>
										<h4 className="text-sm font-medium">
											Current View
										</h4>
										<p className="text-xs text-muted-foreground">
											{view === "grid"
												? "Grid view shows content in cards"
												: "List view displays content in a compact format"}
										</p>
									</div>
									<NodgeLayoutSwitch
										currentView={view}
										onViewChange={setView}
									/>
								</div>
							</Card>
						</div>

						<Separator />
						<div className="space-y-4">
							<div>
								<h3 className="text-base font-medium">
									Default Color
								</h3>
								<p className="text-sm text-muted-foreground">
									Color scheme for the application. Choose
									between Orange, Purple, Rose, Default,
									Purple and Blue modes to customize the
									visual appearance.
								</p>
							</div>
							<Card className="p-3 px-5 rounded-md grid grid-cols-[1fr_70px]">
								<div className="w-full h-auto grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 gap-2 place-content-center place-items-center">
									{Object.entries(ThemeColorCards).map(
										([
											key,
											{ name, color, colorPallets },
										]) => (
											<div
												key={key}
												className={`relative h-auto w-full p-4 rounded-md flex justify-center gap-1 items-center cursor-pointer border-[1px] ${
													color === selectedColor &&
													"bg-card bg-clip-content"
												}`}
												onClick={() => {
													setColor(key as ThemeColor);
												}}
											>
												{key.toLowerCase() ===
													selectedColor.toLowerCase() && (
													<div className="absolute top-0 right-0 w-10 h-10 clip-triangle bg-primary rounded flex justify-center items-center">
														<CheckCheck className="w-4 h-4 text-white absolute right-1 top-1" />
													</div>
												)}
												{colorPallets?.map((items) => {
													return (
														<span
															key={items.name}
															className={`w-5 h-10 rounded-md ${items.color} border-[1px]`}
														></span>
													);
												})}
											</div>
										)
									)}
								</div>
							</Card>
						</div>
					</CardContent>
				</Card>
			</div>
		</ScrollArea>
	);
};

export default AppearanceSetting;
