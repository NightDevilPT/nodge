"use client";

import {
	Bar,
	BarChart,
	CartesianGrid,
	Tooltip,
	XAxis,
	YAxis,
	ResponsiveContainer,
} from "recharts";
import {
	ChartLegend,
	ChartLegendContent,
	ChartTooltipContent,
} from "@/components/ui/chart";

interface NodgeBarChartProps {
	data: any[];
	config: any;
	selectedSeries: string[];
	showTooltip: boolean;
	showTooltipType?: "dot" | "line" | "dashed";
	showLegend: boolean;
}

const NodgeBarChart=({
	data,
	config,
	selectedSeries,
	showTooltip,
	showTooltipType,
	showLegend,
}: NodgeBarChartProps)=>{
	return (
		<ResponsiveContainer width="100%">
			<BarChart data={data}>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="date"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					minTickGap={32}
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
						content={
							<ChartTooltipContent
								indicator={showTooltipType as any}
							/>
						}
						cursor={false}
					/>
				)}
				{showLegend && <ChartLegend content={<ChartLegendContent />} />}
				{selectedSeries.map((key) => (
					<Bar
						key={key}
						dataKey={key}
						fill={config[key].color || "var(--color-mobile)"}
						radius={4}
					/>
				))}
			</BarChart>
		</ResponsiveContainer>
	);
}

export default NodgeBarChart;