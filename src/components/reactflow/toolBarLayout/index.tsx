"use client";

import React from "react";
import { LucideTextCursorInput } from "lucide-react";
import { NodeTypesEnum, ToolbarButton, ToolbarButtonProps } from "../interface";
import ToolbarButtonUi from "./toolbarButton";

export const GeneralButtons = [
	new ToolbarButton("Input", NodeTypesEnum.INPUTNODE, LucideTextCursorInput),
];

const ToolBarLayout = () => {
	return (
		<div
			className={`w-full h-full px-5 bg-background flex justify-start items-center gap-2 flex-wrap`}
		>
			{GeneralButtons.map(
				({ label, icon: Icon, id, type }: ToolbarButtonProps) => (
					<ToolbarButtonUi
						key={id}
						label={label}
						icon={Icon}
						type={type}
						id={id}
					/>
				)
			)}
		</div>
	);
};

export default ToolBarLayout;
