"use client";

import React from "react";
import { ToolbarButtonProps } from "../interface";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const ToolbarButtonUi = ({
	label,
	id,
	icon: Icon,
	type,
}: ToolbarButtonProps) => {
	const onDragStart = (event: React.DragEvent) => {
		event.dataTransfer.effectAllowed = "move";
		event.dataTransfer.setData("application/reactflow", type);
	};

	return (
		<Button
			onDragStart={onDragStart}
			className={`flex justify-start items-center gap-2 cursor-grab`}
			key={id}
			variant={"outline"}
			draggable
		>
			<Icon className={`w-4 h-4 text-foreground`} />
			<Label>{label}</Label>
		</Button>
	);
};

export default ToolbarButtonUi;
