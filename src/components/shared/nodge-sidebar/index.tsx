"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nodgeSidebarRoute } from "./route";
import { SidebarEnum } from "@/components/providers/view-layout-provider";

interface NodgeSidebarProps {
	variant?: SidebarEnum;
}

const NodgeSidebar = ({
	variant = SidebarEnum.ICON_TEXT,
}: NodgeSidebarProps) => {
	const pathname = usePathname();

	return (
		<div className="w-full h-full space-y-2">
			{nodgeSidebarRoute.map((route) => {
				const isActive = pathname === route.link;
				const IconComponent = isActive ? route.fillIcon : route.icon;
				const showLabel = variant === SidebarEnum.ICON_TEXT;

				return (
					<Link
						key={route.id}
						href={route.link}
						className={`
              flex items-center px-3 py-2 rounded-md 
              ${showLabel ? "space-x-2" : "justify-center"}
              ${
					isActive
						? "bg-gradient-to-tr from-primary to-primary-300 text-primary-foreground"
						: "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
				}
            `}
						title={!showLabel ? route.label : undefined}
						aria-label={!showLabel ? route.label : undefined}
					>
						<IconComponent className="w-4 h-4" />
						{showLabel && (
							<span className="text-sm truncate">
								{route.label}
							</span>
						)}
					</Link>
				);
			})}
		</div>
	);
};

export default NodgeSidebar;
