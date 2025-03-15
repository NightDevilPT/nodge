// Define the interface for a single data point
export interface NodgeChartDataPoint {
	[key: string]: number | string | Date; // Allow any number of properties with string keys and number or string values
}

// Define the interface for the chart configuration
export interface NodgeChartConfig {
	[key: string]: {
		label: string; // The label for the dataset
		color: string; // The color for the dataset
	};
}

export interface NodgeChartProps {
	title: string;
	description?: string;
	className?: string;
	chartConfig: NodgeChartConfig;
	chartData: NodgeChartDataPoint[];
	showTooltip?: boolean;
	showTooltipType?: "dot" | "line" | "dashed";
	showLegend?: boolean;
}