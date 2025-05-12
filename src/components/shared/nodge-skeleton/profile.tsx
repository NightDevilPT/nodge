"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ProfileSettingSkeleton() {
	return (
		<ScrollArea className="h-full w-full">
			<div className="container mx-auto py-4">
				<Card className="w-full bg-transparent mx-auto">
					<CardHeader>
						<Skeleton className="h-8 w-[200px]" />
					</CardHeader>
					<CardContent>
						<div className="space-y-6">
							{/* Avatar Section */}
							<div className="flex flex-col items-center gap-4 mb-6">
								<Skeleton className="h-24 w-24 rounded-full" />
								<div className="flex flex-col items-center gap-2">
									<Skeleton className="h-10 w-[150px]" />
									<Skeleton className="h-4 w-[180px]" />
								</div>
							</div>

							<Separator className="my-6" />

							{/* Form Fields */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* First Name */}
								<div className="space-y-2">
									<Skeleton className="h-4 w-[80px]" />
									<Skeleton className="h-10 w-full" />
								</div>

								{/* Last Name */}
								<div className="space-y-2">
									<Skeleton className="h-4 w-[80px]" />
									<Skeleton className="h-10 w-full" />
								</div>

								{/* Phone Number */}
								<div className="space-y-2">
									<Skeleton className="h-4 w-[100px]" />
									<Skeleton className="h-10 w-full" />
								</div>
							</div>

							{/* Action Buttons */}
							<div className="flex justify-end gap-4 pt-4">
								<Skeleton className="h-10 w-[80px]" />
								<Skeleton className="h-10 w-[120px]" />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</ScrollArea>
	);
}
