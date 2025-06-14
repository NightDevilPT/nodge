import { SidebarEnum } from "@/components/providers/view-layout-provider";
import React from "react";
import { TbDragDrop } from "react-icons/tb";

const NodgeLogo = ({
	varient = SidebarEnum.ICON_TEXT,
}: {
	varient?: SidebarEnum;
}) => {
	return (
		<div className={`w-auto h-full flex gap-3 justify-start items-center`}>
			<div
				className={`w-8 h-8 p-1 bg-gradient-to-tr rounded-md from-primary to-primary-300`}
			>
				<TbDragDrop className={`w-full h-full text-white`} />
			</div>
			{varient === SidebarEnum.ICON_TEXT && (
				<h2
					className={`flex-1 text-2xl font-[800] text-prima-foreground`}
				>
					<span
						className={`bg-gradient-to-tr from-primary to-primary-300 bg-clip-text text-transparent`}
					>
						Node
					</span>
					Flow
				</h2>
			)}
		</div>
	);
};

export default NodgeLogo;
