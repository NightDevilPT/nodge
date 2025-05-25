"use client";

import { usePathname } from "next/navigation";
import { nodgeSidebarRoute } from "./route";
import Link from "next/link";

const NodgeSidebar = () => {
	const pathname = usePathname(); // Get the current route

	return (
		<div className="w-full h-full space-y-2">
			{nodgeSidebarRoute.map((route) => {
				const isActive = pathname === route.link; // Check if the current route matches
				return (
					<Link
						key={route.id}
						href={route.link}
						className={`flex items-center px-3 py-2 space-x-2 rounded-md ${
							isActive
								? `bg-gradient-to-tr from-primary to-primary-300 text-primary-foreground`
								: "bg-transparent text-foreground"
						}`}
					>
						{isActive ? (
							<route.fillIcon className={`w-4 h-4`} />
						) : (
							<route.icon className={`w-4 h-4`} />
						)}
						<span className={`text-sm`}>{route.label}</span>
					</Link>
				);
			})}
		</div>
	);
};

export default NodgeSidebar;
