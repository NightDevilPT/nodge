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
		<Tabs
			defaultValue={defaultValue || tabs[0].label}
			className="w-full flex justify-start items-start flex-col gap-0"
		>
			<TabsList className="h-auto w-auto px-2 py-1.5 gap-4 bg-transparent border-[1px]">
				{tabs.map((tab, index) => (
					<TabsTrigger
						key={index}
						value={tab.label}
						className="data-[state=active]:bg-gradient-to-tr data-[state=active]:from-primary data-[state=active]:to-primary-300 data-[state=active]:text-primary-foreground"
					>
						{tab.trigger}
					</TabsTrigger>
				))}
			</TabsList>
			{tabs.map((tab, index) => (
				<TabsContent
					className="w-full mt-0"
					key={index}
					value={tab.label}
				>
					{tab.content}
				</TabsContent>
			))}
		</Tabs>
	);
};

export default NodgeTabs;
