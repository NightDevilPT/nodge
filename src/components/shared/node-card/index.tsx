import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NodeCardProps } from "@/interface/card.interface";
import React from "react";

const NodgeCards = ({
	title,
	icon: Icon,
	count,
	description,
}: NodeCardProps) => {
	return (
		<Card className={`w-full h-auto`}>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				<Icon className="w-5 h-5 text-foreground" />
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{count}</div>
				{description && (
					<p className="text-xs text-muted-foreground">
						{description}
					</p>
				)}
			</CardContent>
		</Card>
	);
};

export default NodgeCards;
