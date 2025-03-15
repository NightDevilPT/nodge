"use client";

import * as React from "react";
import { format } from "date-fns/format";
import { Calendar as CalendarIcon } from "lucide-react";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

interface DatePickerProps {
	mode: "single" | "range";
	className?: string;
	initialDate?: Date;
	initialRange?: DateRange;
	onChange?: (date: Date | DateRange | undefined) => void;
	startDate?: Date;
	endDate?: Date;
}

export function DatePicker({
	mode,
	className,
	initialDate,
	initialRange,
	onChange,
	startDate,
	endDate,
}: DatePickerProps) {
	const [date, setDate] = React.useState<Date | undefined>(initialDate);
	const [range, setRange] = React.useState<DateRange | undefined>(
		initialRange
	);
	const [open, setOpen] = React.useState(false); // Manage popover state

	const handleSelect = (selectedDate: Date | DateRange | undefined) => {
		if (mode === "single" && selectedDate instanceof Date) {
			setDate(selectedDate);
		} else if (mode === "range" && selectedDate && "from" in selectedDate) {
			setRange(selectedDate as DateRange);
		}
	};

	const handleSave = () => {
		if (mode === "single") {
			onChange?.(date);
		} else {
			onChange?.(range);
		}
		setOpen(false);
	};

	return (
		<div className={cn("grid gap-2 w-full", className)}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						onClick={() => setOpen(true)}
						variant={"secondary"}
						className={cn(
							"w-full justify-start text-left font-normal truncate px-2",
							!date && !range && "text-muted-foreground"
						)}
					>
						<CalendarIcon className="h-4 w-4" />
						{mode === "single" ? (
							date ? (
								<span className="w-full truncate">
									{format(date, "PPP")}
								</span>
							) : (
								<span>Pick a date</span>
							)
						) : range?.from ? (
							range.to ? (
								<span className="w-full truncate">
									{format(range.from, "LLL dd, y")} -{" "}
									{format(range.to, "LLL dd, y")}
								</span>
							) : (
								<span className="w-full truncate">
									{format(range.from, "LLL dd, y")}
								</span>
							)
						) : (
							<span>Pick a date range</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-full p-0" align="start">
					<Calendar
						initialFocus
						{...(mode === "single"
							? {
									mode: "single" as const, // Explicitly cast to satisfy TypeScript
									selected: date,
									onSelect: (
										selectedDate: Date | undefined
									) => handleSelect(selectedDate),
									defaultMonth: date,
							  }
							: {
									mode: "range" as const, // Explicitly cast to satisfy TypeScript
									selected: range,
									onSelect: (
										selectedDate: DateRange | undefined
									) => handleSelect(selectedDate),
									defaultMonth: range?.from,
									numberOfMonths: 2,
							  })}
						disabled={(date) => {
							if (!startDate && !endDate) return false;

							const normalizedDate = date.setHours(0, 0, 0, 0);
							const normalizedStart = startDate
								? startDate.setHours(0, 0, 0, 0)
								: undefined;
							const normalizedEnd = endDate
								? endDate.setHours(0, 0, 0, 0)
								: undefined;

							return (
								(normalizedStart !== undefined &&
									normalizedDate < normalizedStart) ||
								(normalizedEnd !== undefined &&
									normalizedDate > normalizedEnd)
							);
						}}
					/>

					<div className="p-2 border-t flex justify-end">
						<Button onClick={handleSave}>Save</Button>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
