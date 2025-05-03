"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const NodgeWorkflowTableSkeleton = () => {
	// Number of skeleton rows to show
	const rows = 5;

	return (
		<div className="w-full rounded-md border">
			{/* Table Header */}
			<div className="grid grid-cols-12 gap-4 border-b p-4">
				{[...Array(8)].map((_, i) => (
					<Skeleton key={`header-${i}`} className="h-4 w-full" />
				))}
			</div>

			{/* Table Rows */}
			<div className="divide-y">
				{[...Array(rows)].map((_, rowIndex) => (
					<div key={rowIndex} className="grid grid-cols-12 gap-4 p-4">
						{/* Name */}
						<div className="col-span-2">
							<Skeleton className="h-4 w-3/4" />
						</div>

						{/* Description */}
						<div className="col-span-2">
							<Skeleton className="h-4 w-full" />
						</div>

						{/* Tags */}
						<div className="col-span-2">
							<div className="flex gap-1">
								<Skeleton className="h-6 w-12 rounded-full" />
								<Skeleton className="h-6 w-12 rounded-full" />
							</div>
						</div>

						{/* Trigger */}
						<div className="col-span-1">
							<Skeleton className="h-6 w-16 rounded-full" />
						</div>

						{/* Status */}
						<div className="col-span-1">
							<Skeleton className="h-6 w-16 rounded-full" />
						</div>

						{/* Visibility */}
						<div className="col-span-1">
							<Skeleton className="h-6 w-16 rounded-full" />
						</div>

						{/* Updated At */}
						<div className="col-span-1">
							<Skeleton className="h-4 w-24" />
						</div>

						{/* Actions */}
						<div className="col-span-2 flex justify-evenly gap-2">
							<Skeleton className="h-8 w-8 rounded-md" />
							<Skeleton className="h-8 w-8 rounded-md" />
							<Skeleton className="h-8 w-8 rounded-md" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
