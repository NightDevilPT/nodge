"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface NodgePopoverProps {
	title: string;
	description: string;
	trigger: React.ReactNode;
	children: React.ReactNode;
	handlePrimaryAction: () => void;
	handleClearAction?: () => void;
	onClose?: () => void; // <-- New prop for closing popover
	primaryActionLabel?: string;
	clearActionLabel?: string;
	align?: "center" | "end" | "start";
}

export function NodgePopover({
	title,
	description,
	trigger,
	children,
	handlePrimaryAction,
	handleClearAction,
	onClose, // <-- Get onClose prop
	primaryActionLabel = "Save",
	clearActionLabel = "Clear",
	align = "end",
}: NodgePopoverProps) {
	const [open, setOpen] = useState(false);

	const closePopover = () => {
		setOpen(false);
		if (onClose) onClose(); // Call parent close function if provided
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>{trigger}</PopoverTrigger>
			<PopoverContent className="w-80 p-0" align={align}>
				<Card className="p-4 bg-transparent border-none">
					<CardHeader className="p-0">
						<CardTitle>{title}</CardTitle>
						<CardDescription>{description}</CardDescription>
					</CardHeader>
					<CardContent className="p-0">{children}</CardContent>
					<CardFooter className="p-0 grid grid-cols-2 gap-3">
						<Button
							variant="outline"
							onClick={() => {
								if(handleClearAction) handleClearAction();
								closePopover();
							}}
						>
							{clearActionLabel}
						</Button>
						<Button
							onClick={() => {
								handlePrimaryAction();
								closePopover();
							}}
						>
							{primaryActionLabel}
						</Button>
					</CardFooter>
				</Card>
			</PopoverContent>
		</Popover>
	);
}
