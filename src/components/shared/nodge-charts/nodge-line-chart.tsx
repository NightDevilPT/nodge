"use client";

import {
	Line,
	LineChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import {
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from "@/components/ui/chart";

interface NodgeLineChartProps {
	data: any[];
	config: any;
	selectedSeries: string[];
	showTooltip?: boolean;
	showTooltipType?: "dot" | "line" | "dashed";
	showLegend?: boolean;
	showDots?: boolean;
}

const NodgeLineChart = ({
	data,
	config,
	selectedSeries,
	showTooltip = true,
	showTooltipType = "dot",
	showLegend = false,
	showDots = false,
}: NodgeLineChartProps) => {
	return (
		<ResponsiveContainer width="100%">
			<LineChart data={data} margin={{ left: 12, right: 12 }}>
				<CartesianGrid vertical={false} strokeDasharray="3 3" />
				<XAxis
					dataKey="date"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					tickFormatter={(value) => {
						const date = new Date(value);
						return date.toLocaleDateString("en-US", {
							month: "short",
							day: "numeric",
						});
					}}
				/>
				<YAxis hide />
				{showTooltip && (
					<Tooltip
						content={<ChartTooltipContent indicator={showTooltipType} />}
						cursor={{ stroke: "#8884d8", strokeDasharray: "3 3" }}
					/>
				)}
				{showLegend && <ChartLegend content={<ChartLegendContent />} />}
				{selectedSeries.map((key) => (
					<Line
						key={key}
						dataKey={key}
						type="natural"
						stroke={config[key].color}
						strokeWidth={2}
						dot={showDots}
					/>
				))}
			</LineChart>
		</ResponsiveContainer>
	);
};

export default NodgeLineChart;
