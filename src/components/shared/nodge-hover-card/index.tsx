import { LuBadgeInfo } from "react-icons/lu";

import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";

interface NodgeHoverCardProps {
	children: React.ReactNode;
}

export function NodgeHoverCard({ children }: NodgeHoverCardProps) {
	return (
		<HoverCard>
			<HoverCardTrigger
				className={`flex justify-center items-center gap-2 cursor-pointer`}
				asChild
			>
				<LuBadgeInfo className="w-4 h-4 text-gray-500" />
			</HoverCardTrigger>
			<HoverCardContent className="px-3 py-2">
				{children}
			</HoverCardContent>
		</HoverCard>
	);
}
