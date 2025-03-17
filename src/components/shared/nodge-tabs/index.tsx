import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // Adjust the import path as necessary

interface TabItem {
	trigger: React.ReactNode; // The component to render as the tab trigger
	content: React.ReactNode; // The component to render as the tab content
	label: string; // The label for the tab
}

interface NodgeTabsProps {
	tabs: TabItem[]; // Array of tab items
	defaultValue?: string; // Optional default value for the active tab
}

const NodgeTabs: React.FC<NodgeTabsProps> = ({ tabs, defaultValue }) => {
	return (
		<Tabs defaultValue={defaultValue} className="w-full flex justify-center items-center flex-col gap-0">
			<TabsList className="h-auto w-auto">
				{tabs.map((tab, index) => (
					<TabsTrigger key={index} value={tab.label}>
						{tab.trigger}
					</TabsTrigger>
				))}
			</TabsList>
			{tabs.map((tab, index) => (
				<TabsContent className="w-full" key={index} value={tab.label}>
					{tab.content}
				</TabsContent>
			))}
		</Tabs>
	);
};

export default NodgeTabs;
