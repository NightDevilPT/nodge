import { Separator } from "@radix-ui/react-select";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const AppearanceSettingSkeleton = () => {
	return (
		<ScrollArea className="h-full w-full">
			<div className="container mx-auto px-4 py-8">
				<Card className="w-full mx-auto bg-transparent">
					<CardHeader>
						<Skeleton className="h-8 w-[200px]" />
					</CardHeader>
					<CardContent className="space-y-8">
						{/* Theme Section */}
						<div className="space-y-4">
							<Skeleton className="h-6 w-[120px]" />
							<div className="flex gap-4">
								<Skeleton className="h-10 w-full" />
								<Skeleton className="h-10 w-full" />
							</div>
						</div>

						<Separator />

						{/* View Preference Section */}
						<div className="space-y-4">
							<Skeleton className="h-6 w-[180px]" />
							<div className="flex gap-4">
								<Skeleton className="h-10 w-full" />
								<Skeleton className="h-10 w-full" />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</ScrollArea>
	);
};

export default AppearanceSettingSkeleton;
