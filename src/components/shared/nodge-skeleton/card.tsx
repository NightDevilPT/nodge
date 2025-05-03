import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export const NodgeWorkflowCardSkeleton = () => {
	return (
		<div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
			{/* Card Header */}
			<div className="p-4 pb-2 flex justify-between items-center">
				<Skeleton className="h-6 w-3/4 rounded-sm" />
				<Skeleton className="h-8 w-8 rounded-sm" />
			</div>

			<Separator />

			{/* Card Content */}
			<div className="p-4 space-y-3">
				{/* Status Badges */}
				<div className="flex gap-2">
					<Skeleton className="h-6 w-16 rounded-full" />
					<Skeleton className="h-6 w-20 rounded-full" />
					<Skeleton className="h-6 w-16 rounded-full" />
				</div>

				{/* Description */}
				<div className="space-y-2">
					<Skeleton className="h-4 w-1/4 rounded-sm" />
					<Skeleton className="h-4 w-full rounded-sm" />
					<Skeleton className="h-4 w-5/6 rounded-sm" />
				</div>

				{/* Tags */}
				<div className="flex flex-wrap gap-2">
					<Skeleton className="h-6 w-12 rounded-full" />
					<Skeleton className="h-6 w-14 rounded-full" />
					<Skeleton className="h-6 w-10 rounded-full" />
				</div>
			</div>

			<Separator />

			{/* Card Footer */}
			<div className="p-4 flex justify-between items-center">
				<Skeleton className="h-4 w-24 rounded-sm" />
				<Skeleton className="h-4 w-32 rounded-sm" />
			</div>
		</div>
	);
};
