"use client";

import {
	Area,
	AreaChart,
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

interface NodgeAreaChartProps {
	data: any[];
	config: any;
	selectedSeries: string[];
	showTooltip: boolean;
	showTooltipType?: "dot" | "line" | "dashed";
	showLegend: boolean;
}

const NodgeAreaChart=({
	data,
	config,
	selectedSeries,
	showTooltip,
	showLegend,
	showTooltipType
}: NodgeAreaChartProps)=>{
	return (
		<ResponsiveContainer width="100%">
			<AreaChart data={data} accessibilityLayer>
				<CartesianGrid vertical={false} strokeDasharray="3 3" />
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
						content={<ChartTooltipContent indicator={showTooltipType as any} />}
						cursor={{
							stroke: "#8884d8",
							strokeDasharray: "3 3",
						}}
					/>
				)}
				{showLegend && <ChartLegend content={<ChartLegendContent />} />}
				{selectedSeries.map((key) => (
					<Area
						key={key}
						dataKey={key}
						type="monotone"
						fill={config[key].color}
						fillOpacity={0.2}
						stroke={config[key].color}
						strokeWidth={2}
						stackId="a"
					/>
				))}
			</AreaChart>
		</ResponsiveContainer>
	);
}

export default NodgeAreaChart;