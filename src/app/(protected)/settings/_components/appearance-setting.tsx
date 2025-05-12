"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { GridIcon, MoonIcon, SunIcon, TableIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ViewEnum } from "@/components/shared/nodge-layout-switch";
import { useView } from "@/components/providers/view-layout-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppearanceSettingSkeleton from "@/components/shared/nodge-skeleton/appearance";

const AppearanceSetting = () => {
	const { theme, setTheme } = useTheme();
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
				<Card className="w-full bg-transparent mx-auto">
					<CardHeader>
						<CardTitle className="text-2xl font-bold">
							Appearance
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-8">
						{/* Theme Section */}
						<div className="space-y-4">
							<h3 className="text-lg font-medium">
								Theme Preferences
							</h3>
							<div className="flex gap-4">
								<Button
									variant={
										theme === "light"
											? "default"
											: "outline"
									}
									onClick={() => setTheme("light")}
									className="flex-1 gap-2"
								>
									<SunIcon className="h-4 w-4" />
									Light
								</Button>
								<Button
									variant={
										theme === "dark" ? "default" : "outline"
									}
									onClick={() => setTheme("dark")}
									className="flex-1 gap-2"
								>
									<MoonIcon className="h-4 w-4" />
									Dark
								</Button>
							</div>
						</div>

						<Separator />

						{/* View Preference Section */}
						<div className="space-y-4">
							<h3 className="text-lg font-medium">
								Default View
							</h3>
							<div className="flex gap-4">
								<Button
									variant={
										view === ViewEnum.TABLE
											? "default"
											: "outline"
									}
									onClick={() => setView(ViewEnum.TABLE)}
									className="flex-1 gap-2"
								>
									<TableIcon className="h-4 w-4" />
									Table View
								</Button>
								<Button
									variant={
										view === ViewEnum.GRID
											? "default"
											: "outline"
									}
									onClick={() => setView(ViewEnum.GRID)}
									className="flex-1 gap-2"
								>
									<GridIcon className="h-4 w-4" />
									Grid View
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</ScrollArea>
	);
};

export default AppearanceSetting;
