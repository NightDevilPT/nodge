import React, { useEffect, useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

// Column Configuration Interface
export interface ColumnConfig<T> {
	field: keyof T; // Key from data
	headerName: string; // Column Label
	sortable?: boolean; // Enables sorting
	renderCell?: (item: T) => React.ReactNode; // Custom Render Function
	width?: string; // Column Width
}

export interface NodgeTableProps<T> {
	data: T[];
	columns: ColumnConfig<T>[];
}

const NodgeTable = <T,>({ data, columns }: NodgeTableProps<T>) => {
	const [sortedData, setSortedData] = useState(data);
	const [sortConfig, setSortConfig] = useState<{
		key: keyof T;
		direction: "asc" | "desc";
	} | null>(null);

	// Update sortedData when data changes (Fix for pagination issue)
	useEffect(() => {
		setSortedData(data);
	}, [data]);

	// Sorting Logic
	const handleSort = (field: keyof T) => {
		let direction: "asc" | "desc" = "asc";
		if (
			sortConfig &&
			sortConfig.key === field &&
			sortConfig.direction === "asc"
		) {
			direction = "desc";
		}
		setSortConfig({ key: field, direction });

		// Sort the data
		const sorted = [...sortedData].sort((a, b) => {
			const aValue = a[field] as string;
			const bValue = b[field] as string;
			return direction === "asc"
				? aValue.localeCompare(bValue)
				: bValue.localeCompare(aValue);
		});
		setSortedData(sorted);
	};

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						{columns.map((col) => (
							<TableHead
								key={col.field as string}
								style={{ width: col.width || "auto" }}
								className="cursor-pointer"
								onClick={() =>
									col.sortable && handleSort(col.field)
								}
							>
								<div
									className={`w-auto h-auto flex justify-center items-center gap-2`}
								>
									{col.headerName}
									{col.sortable &&
										sortConfig?.key === col.field && (
											<span className="ml-1">
												{sortConfig.direction ===
												"asc" ? (
													<ArrowUp size={14} />
												) : (
													<ArrowDown size={14} />
												)}
											</span>
										)}
								</div>
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{sortedData.map((item, index) => (
						<TableRow key={index}>
							{columns.map((col) => (
								<TableCell
									key={`${index}-${col.field as string}`}
									className="text-center"
								>
									{col.renderCell
										? col.renderCell(item)
										: (item[col.field] as React.ReactNode)}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default NodgeTable;
