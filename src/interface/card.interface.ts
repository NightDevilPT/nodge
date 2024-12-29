import { FiUsers, FiFileText, FiSettings, FiBarChart } from "react-icons/fi";

export interface NodeCardProps {
	title: string;
	icon: React.ElementType;
	count: number;
	description?: string;
}

export const DummCardData = [
	{
		title: "Total Workflows",
		icon: FiUsers,
		count: 1200,
		description: "Active users in the system",
	},
	{
		title: "Reports",
		icon: FiFileText,
		count: 45,
		description: "Reports generated this week",
	},
	{
		title: "Settings",
		icon: FiSettings,
		count: 7,
		description: "Configuration changes pending",
	},
	{
		title: "Analytics",
		icon: FiBarChart,
		count: 89,
		description: "Monthly analytics completed",
	},
];
