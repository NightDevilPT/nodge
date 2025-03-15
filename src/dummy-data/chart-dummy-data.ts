import {
	NodgeChartConfig,
	NodgeChartDataPoint,
} from "@/interface/chart.interface";

export const chartData: NodgeChartDataPoint[] = [
	{ date: "2025-04-01", desktop: 222, mobile: 150, tablet: 100 },
	{ date: "2025-04-02", desktop: 97, mobile: 180, tablet: 120 },
	{ date: "2025-04-03", desktop: 167, mobile: 120, tablet: 90 },
	{ date: "2025-04-04", desktop: 242, mobile: 260, tablet: 200 },
	{ date: "2025-04-05", desktop: 373, mobile: 290, tablet: 220 },
	{ date: "2025-04-06", desktop: 301, mobile: 340, tablet: 250 },
	{ date: "2025-04-07", desktop: 245, mobile: 180, tablet: 130 },
	{ date: "2025-04-08", desktop: 409, mobile: 320, tablet: 270 },
	{ date: "2025-04-09", desktop: 59, mobile: 110, tablet: 80 },
	{ date: "2025-04-10", desktop: 261, mobile: 190, tablet: 140 },
	{ date: "2025-04-11", desktop: 327, mobile: 350, tablet: 290 },
	{ date: "2025-04-12", desktop: 292, mobile: 210, tablet: 180 },
	{ date: "2025-04-13", desktop: 342, mobile: 380, tablet: 300 },
	{ date: "2025-04-14", desktop: 137, mobile: 220, tablet: 150 },
	{ date: "2025-04-15", desktop: 120, mobile: 170, tablet: 130 },
	{ date: "2025-04-16", desktop: 138, mobile: 190, tablet: 140 },
	{ date: "2025-04-17", desktop: 446, mobile: 360, tablet: 280 },
	{ date: "2025-04-18", desktop: 364, mobile: 410, tablet: 310 },
	{ date: "2025-04-19", desktop: 243, mobile: 180, tablet: 160 },
	{ date: "2025-04-20", desktop: 89, mobile: 150, tablet: 110 },
	{ date: "2025-04-21", desktop: 137, mobile: 200, tablet: 150 },
	{ date: "2025-04-22", desktop: 224, mobile: 170, tablet: 140 },
	{ date: "2025-04-23", desktop: 138, mobile: 230, tablet: 170 },
	{ date: "2025-04-24", desktop: 387, mobile: 290, tablet: 250 },
	{ date: "2025-04-25", desktop: 215, mobile: 250, tablet: 210 },
	{ date: "2025-04-26", desktop: 75, mobile: 130, tablet: 100 },
	{ date: "2025-04-27", desktop: 383, mobile: 420, tablet: 300 },
	{ date: "2025-04-28", desktop: 122, mobile: 180, tablet: 140 },
	{ date: "2025-04-29", desktop: 315, mobile: 240, tablet: 190 },
	{ date: "2025-04-30", desktop: 454, mobile: 380, tablet: 320 },
];

export const chartConfig: NodgeChartConfig = {
	desktop: {
		label: "Desktop",
		color: "hsl(var(--chart-1))",
	},
	mobile: {
		label: "Mobile",
		color: "hsl(var(--chart-2))",
	},
	tablet: {
		label: "Tablet",
		color: "hsl(var(--chart-3))",
	},
};
