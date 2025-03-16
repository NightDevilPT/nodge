import NodgeCards from "@/components/shared/node-card";
import NodgeChart from "@/components/shared/nodge-charts";
import { chartConfig, chartData } from "@/dummy-data/chart-dummy-data";
import { DummCardData, NodeCardProps } from "@/interface/card.interface";

export default function Home() {
	return (
		<main className="w-full h-full overflow-auto flex justify-start items-start flex-col gap-3 p-3">
			<div className="w-full h-auto grid grid-cols-4 gap-3">
				{DummCardData?.map((card: NodeCardProps, index: number) => (
					<NodgeCards {...card} key={card.title + "-" + index} />
				))}
			</div>

			{/* Chart Section */}
			<div className={`w-full grid grid-cols-2 gap-4`}>
				<NodgeChart
					chartType="area"
					title="Area Chart - Multiple"
					description="January - June 2024"
					chartConfig={chartConfig}
					chartData={chartData as any}
				/>
				<NodgeChart
					chartType="bar"
					title="Bar Chart - Multiple"
					description="January - June 2024"
					chartConfig={chartConfig}
					chartData={chartData as any}
				/>
				<NodgeChart
					chartType="pie"
					title="Donut Chart - Multiple"
					description="January - June 2024"
					chartConfig={chartConfig}
					chartData={chartData as any}
				/>
				<NodgeChart
					chartType="line"
					title="Line Chart - Multiple"
					description="January - June 2024"
					chartConfig={chartConfig}
					chartData={chartData as any}
				/>
			</div>
		</main>
	);
}
