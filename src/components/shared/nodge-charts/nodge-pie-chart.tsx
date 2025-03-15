"use client";

import { useState } from "react";
import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	ResponsiveContainer,
	Label,
} from "recharts";
import {
	ChartLegend,
	ChartLegendContent,
	ChartTooltipContent,
} from "@/components/ui/chart";

interface NodgeDonutChartProps {
	data: any[];
	config: any;
	selectedSeries: string[];
	showTooltip: boolean;
	showLegend: boolean;
}

const NodgeDonutChart = ({
	data,
	config,
	selectedSeries,
	showTooltip,
	showLegend,
}: NodgeDonutChartProps) => {
	const [activeData, setActiveData] = useState<{
		name?: string;
		value?: number;
	} | null>(null);

	const filteredData = selectedSeries.map((key) => ({
		name: key,
		value: data.reduce((sum, item) => sum + (item[key] || 0), 0),
		color: config[key].color,
	}));

	return (
		<ResponsiveContainer width="100%">
			<PieChart>
				<Pie
					data={filteredData}
					cx="50%"
					cy="50%"
					labelLine={false}
					outerRadius={100}
					innerRadius={60}
					dataKey={"value"}
					onMouseEnter={(data) => setActiveData(data)}
					onMouseLeave={() => setActiveData(null)}
				>
					{filteredData.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={entry.color} />
					))}
					<Label
						content={({ viewBox }) => {
							if (viewBox && "cx" in viewBox && "cy" in viewBox) {
								return (
									<text
										x={viewBox.cx}
										y={viewBox.cy}
										textAnchor="middle"
										dominantBaseline="middle"
									>
										<tspan
											x={viewBox.cx}
											y={viewBox.cy}
											className="fill-foreground text-2xl font-bold"
										>
											{activeData
												? activeData.value
												: "-"}
										</tspan>
										<tspan
											x={viewBox.cx}
											y={(viewBox.cy || 0) + 24}
											className="fill-muted-foreground"
										>
											{activeData ? activeData.name : "-"}
										</tspan>
									</text>
								);
							}
						}}
					/>
				</Pie>
				{showTooltip && <Tooltip content={<ChartTooltipContent />} />}
				{showLegend && <ChartLegend content={<ChartLegendContent />} />}
			</PieChart>
		</ResponsiveContainer>
	);
};

export default NodgeDonutChart;
