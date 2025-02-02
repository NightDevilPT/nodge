"use client";

import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { NodeTypeColors, SidebarButtonProps } from "../interface";
import { SidebarButtons } from "../nodes/custom-nodes/node-registry";

const ToolBarLayout = () => {
	const allItems = Object.keys(SidebarButtons);
	return (
		<div
			className={`w-full h-full bg-background grid grid-cols-1 gap-2 place-content-start`}
		>
			<Accordion type="multiple" className="w-full space-y-2" defaultValue={allItems}>
				{allItems.map(
					(items: string, index: number) => {
						return (
							<AccordionItem
								value={items}
								key={items + ":" + index}
								className={`w-full border-2 border-secondary rounded-md`}
							>
								<AccordionTrigger className={`p-2`}>{items}</AccordionTrigger>
								{SidebarButtons[items].map(
									(
										{
											label,
											icon,
											type,
										}: SidebarButtonProps,
										sideBarIndex: number
									) => {
										return (
											<ToolBarButton
												label={label}
												icon={icon}
												type={type}
												key={label + ":" + sideBarIndex}
											/>
										);
									}
								)}
							</AccordionItem>
						);
					}
				)}
			</Accordion>
		</div>
	);
};

export default ToolBarLayout;

export const ToolBarButton = ({
	label,
	icon: Icon,
	type,
}: SidebarButtonProps) => {
	const formatLabel = () => {
		return label.replace(/-/g, " ").trim();
	};

	const onDragStart = (event: React.DragEvent) => {
		event.dataTransfer.effectAllowed = "move";
		event.dataTransfer.setData("application/reactflow", type);
	};

	return (
		<AccordionContent
			draggable
			onDragStart={onDragStart}
			className={`w-full p-0 px-3 cursor-pointer mb-3`}
		>
			<Button className={`flex w-full justify-start items-center gap-2`} variant={"outline"}>
				<Icon className={`w-4 h-4`} />
				<Label className={`capitalize cursor-pointer`}>{formatLabel()}</Label>
			</Button>
		</AccordionContent>
	);
};
