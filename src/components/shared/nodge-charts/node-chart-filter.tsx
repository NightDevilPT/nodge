import React, { useState } from "react";

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getMinMaxDates } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { NodgePopover } from "../nodge-popover";
import { DatePicker } from "../nodge-date-picker";
import { NodgeChartDataPoint } from "@/interface/chart.interface";

// Define the type for the chart configuration
interface ChartConfig {
	[key: string]: {
		label: string;
		color?: string; // Optional color property
	};
}

// Define the props for the NodgeChartFilter component
interface NodgeChartFilterProps {
	chartConfig: ChartConfig; // The configuration for the charts
	selectedSeries: string[]; // The currently selected series
	onSeriesChange: (series: string[]) => void; // Callback for series changes
	onDateRangeChange: (dateRange: DateRange) => void; // Callback for date range changes
	chartData: NodgeChartDataPoint[]; //
}

const NodgeChartFilter: React.FC<NodgeChartFilterProps> = ({
	chartConfig,
	selectedSeries,
	onSeriesChange,
	onDateRangeChange,
	chartData,
}) => {
	const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
	const [selected, setSelected] = useState<string[]>(selectedSeries);
	const { minDate, maxDate } = getMinMaxDates(chartData);
	// Toggle series visibility
	const handleToggle = (key: string) => {
		const updatedSeries = selectedSeries.includes(key)
			? selectedSeries.filter((s) => s !== key)
			: [...selectedSeries, key];
		setSelected(updatedSeries); // Update the selected series state
	};

	return (
		<NodgePopover
			title="Filter Options"
			description="Select the series and date range."
			trigger={<Button variant="ghost">i</Button>}
			handlePrimaryAction={() => {
				onSeriesChange(selected);
				onDateRangeChange(dateRange as DateRange);
			}}
			onClose={() => console.log("Popover closed")}
		>
			<div className="w-full h-auto my-3 space-y-3">
				<DropdownMenu>
					<div className="w-full h-auto grid grid-cols-[120px,1fr] place-content-center place-items-center gap-3">
						<Label className={`w-full text-left`}>Legends :</Label>
						<DropdownMenuTrigger asChild>
							<Button
								variant="secondary"
								className="capitalize truncate w-full flex justify-start items-start"
							>
								{selected.join(", ")}
							</Button>
						</DropdownMenuTrigger>
					</div>
					<DropdownMenuContent className="!w-full">
						{Object.keys(chartConfig).map((key) => (
							<DropdownMenuCheckboxItem
								key={key}
								checked={selected.includes(key)}
								onCheckedChange={() => handleToggle(key)}
							>
								{chartConfig[key].label}
							</DropdownMenuCheckboxItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
				<div className="w-full h-auto grid grid-cols-[120px,1fr] place-content-start place-items-center gap-3">
					<Label className={`w-full text-left`}>Date :</Label>
					<DatePicker
						mode="range"
						startDate={minDate}
						endDate={maxDate}
						initialRange={dateRange as DateRange}
						onChange={(range) => {
							setDateRange(range as DateRange);
						}}
					/>
				</div>
			</div>
		</NodgePopover>
	);
};

export default NodgeChartFilter;
