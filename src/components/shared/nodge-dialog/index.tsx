import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Button, ButtonProps } from "@/components/ui/button";
import { ReactNode } from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";

interface NodgeDialogProps {
	// Trigger configuration
	trigger?: ReactNode;
	contextMenuItems?: ReactNode[];
	triggerAsChild?: boolean;

	// Dialog content
	title: string;
	subtitle?: string;
	children?: ReactNode;

	// Form handling
	isForm?: boolean;
	onSubmit?: () => void;

	// Actions
	showCancel?: boolean;
	cancelText?: string;
	actionText?: string;
	onCancel?: () => void;
	actionButtonProps?: ButtonProps;

	// State
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export const NodgeDialog = ({
	trigger,
	contextMenuItems,
	triggerAsChild = true,
	title,
	subtitle,
	children,
	isForm = false,
	onSubmit,
	showCancel = true,
	cancelText = "Cancel",
	actionText = "Confirm",
	onCancel,
	actionButtonProps,
	open,
	onOpenChange,
}: NodgeDialogProps) => {
	const handleCancel = () => {
		onCancel?.();
		onOpenChange?.(false);
	};

	const handleSubmit = () => {
		onSubmit?.();
		onOpenChange?.(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			{trigger && (
				<DialogTrigger asChild={triggerAsChild}>
					{contextMenuItems ? (
						<ContextMenu>
							<ContextMenuTrigger>{trigger}</ContextMenuTrigger>
							<ContextMenuContent>
								{contextMenuItems.map((item, index) => (
									<ContextMenuItem key={index}>
										{item}
									</ContextMenuItem>
								))}
								<DialogTrigger asChild>
									<ContextMenuItem>
										<span>{actionText}</span>
									</ContextMenuItem>
								</DialogTrigger>
							</ContextMenuContent>
						</ContextMenu>
					) : (
						trigger
					)}
				</DialogTrigger>
			)}

			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{subtitle && (
						<DialogDescription>{subtitle}</DialogDescription>
					)}
				</DialogHeader>

				{children}

				<DialogFooter>
					{showCancel && (
						<DialogClose asChild>
							<Button variant="outline" onClick={handleCancel}>
								{cancelText}
							</Button>
						</DialogClose>
					)}
					{isForm ? (
						<Button
							type="submit"
							{...actionButtonProps}
							onClick={handleSubmit}
						>
							{actionText}
						</Button>
					) : (
						<Button {...actionButtonProps} onClick={handleSubmit}>
							{actionText}
						</Button>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
