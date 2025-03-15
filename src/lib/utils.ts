import { NodgeChartDataPoint } from "@/interface/chart.interface";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getUniqueId = () => {
	return crypto.randomUUID();
};

export const commonStyle = {
	gradientText: `bg-gradient-to-tr from-primary to-green-300 bg-clip-text text-transparent`,
	gradientBg: `bg-gradient-to-tr rounded-md from-primary to-green-400`,
};

export const getMinMaxDates = (data: NodgeChartDataPoint[]) => {
	const dates = data.map((d) => new Date(d.date));
	const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
	const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));

	return { minDate, maxDate };
};
