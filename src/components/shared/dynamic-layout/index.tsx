"use client";

import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";

import NodgeLogo from "../logo";
import NodgeSidebar from "../nodge-sidebar";
import { NodgeUserNav } from "../nodge-user-nav";
import NodgeBreadcrumb from "../nodeg-breadcrumb";
import { NodgeThemeToggle } from "../nodge-theme-toggle";
import {
	SidebarEnum,
	useView,
} from "@/components/providers/view-layout-provider";

const NodgeDynamicLayout = ({ children }: { children: ReactNode }) => {
	const { sideBarView } = useView();
	const pathName = usePathname();
	const pathArray = pathName.split("/").filter((segment) => segment);
	const isReactFlowPath =
		pathArray[pathArray.length - 1] === "reactflow" ||
		(pathArray.length >= 2 &&
			pathArray[pathArray.length - 2] === "reactflow");

	if (isReactFlowPath) {
		return children;
	}

	return (
		<main
			className={`w-full h-screen grid ${
				sideBarView === SidebarEnum.ICON_TEXT
					? "grid-cols-[300px,_1fr]"
					: "grid-cols-[80px,_1fr]"
			}`}
		>
			<div
				className={`w-full h-full grid grid-rows-[80px,_1fr] border-r border-r-secondary`}
			>
				<div
					className={`w-full h-full border-b-2 border-secondary flex justify-center items-center px-5 py-2`}
				>
					<NodgeLogo varient={sideBarView} />
				</div>
				<div
					className={`w-full h-full px-5 py-2 overflow-auto flex justify-start items-start`}
				>
					<NodgeSidebar variant={sideBarView} />
				</div>
			</div>
			<div
				className={`w-full h-full overflow-y-auto grid grid-rows-[70px,_1fr]`}
			>
				<div
					className={`w-full h-full border-b border-b-secondary flex justify-between items-center px-5 py-2`}
				>
					<NodgeBreadcrumb />
					<div
						className={`w-auto h-full grid grid-cols-2 gap-3 place-content-center place-items-center`}
					>
						<NodgeThemeToggle />
						<NodgeUserNav />
					</div>
				</div>
				<div className={`w-full h-full overflow-y-auto`}>
					{children}
				</div>
			</div>
		</main>
	);
};

export default NodgeDynamicLayout;
