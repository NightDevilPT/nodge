"use client";

import { ElementType, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { DateRange } from "react-day-picker";
import NodgeChartFilter from "./node-chart-filter";
import NodgeDonutChart from "./nodge-pie-chart";
import NodgeBarChart from "./nodge-bar-chart";
import NodgeLineChart from "./nodge-line-chart";
import NodgeAreaChart from "./nodge-area-chart";
import { ChartContainer } from "@/components/ui/chart";
import { NodgeChartProps } from "@/interface/chart.interface";

interface BaseChartProps extends NodgeChartProps {
	chartType: "area" | "bar" | "pie" | "line";
}

const NodgeChart = ({
	title,
	description,
	chartConfig,
	chartData,
	showTooltip = true,
	showTooltipType = "dot",
	showLegend = true,
	chartType,
}: BaseChartProps) => {
	const [selectedSeries, setSelectedSeries] = useState<string[]>(
		Object.keys(chartConfig)
	);
	const [filteredChartData, setFilteredChartData] = useState(chartData);

	// Function to filter chart data based on selected date range
	const filterChartData = (dateRange: DateRange) => {
		if (!dateRange.from && !dateRange.to) {
			setFilteredChartData(chartData);
			return;
		}

		const filteredData = chartData.filter((item) => {
			const itemDate = new Date(item.date);
			const fromDate = dateRange.from ? new Date(dateRange.from) : null;
			const toDate = dateRange.to ? new Date(dateRange.to) : null;

			return (
				(!fromDate || itemDate >= fromDate) &&
				(!toDate || itemDate <= toDate)
			);
		});
		setFilteredChartData(filteredData);
	};

	const chartSwitcher: { [key: string]: ElementType } = {
		area: NodgeAreaChart,
		bar: NodgeBarChart,
		pie: NodgeDonutChart,
		line: NodgeLineChart,
	};
	const ChartComponent = chartSwitcher[chartType];

	return (
		<Card className="p-4">
			<CardHeader className="p-0 grid grid-cols-[1fr,40px] place-items-center place-content-center">
				<div className="w-full h-auto">
					<CardTitle>{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</div>
				<NodgeChartFilter
					chartConfig={chartConfig}
					selectedSeries={selectedSeries}
					onSeriesChange={setSelectedSeries}
					onDateRangeChange={filterChartData}
					chartData={chartData}
				/>
			</CardHeader>

			<CardContent className="p-0 my-2">
				<ChartContainer config={chartConfig}>
					<ChartComponent
						data={filteredChartData}
						config={chartConfig}
						selectedSeries={selectedSeries}
						showTooltip={showTooltip}
						showLegend={showLegend}
						showTooltipType={showTooltipType}
					/>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default NodgeChart;
