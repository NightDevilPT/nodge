import { CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React from "react";
import { MdDelete, MdDragIndicator } from "react-icons/md";
import { IoIosCopy } from "react-icons/io";

interface NodeHeaderProps {
	label: string;
	icon: React.ElementType;
	iconColor: string;
	dragHandle: string | undefined;
}

const NodeHeader = ({
	label,
	icon: Icon,
	dragHandle,
	iconColor,
}: NodeHeaderProps) => {
	console.log(dragHandle);
	return (
		<CardHeader
			className={`min-w-80 p-0 px-3 py-3 rounded-t-md border-accent border-b-2`}
		>
			<CardTitle
				className={`min-w-80 flex justify-between items-center gap-3`}
			>
				<div
					className={`w-auto h-auto flex justify-start items-center gap-2`}
				>
					<Icon className={`w-4 h-4 ${iconColor}`} />
					<Label className={`text-sm`}>{label}</Label>
				</div>
				<div
					className={`w-auto h-auto flex justify-between items-center gap-1`}
				>
					<button className={`w-5 h-5`}>
						<IoIosCopy className={`w-4 h-4 text-green-400`} />
					</button>
					<button className={`w-5 h-5`}>
						<MdDelete className={`w-5 h-5 text-red-400`} />
					</button>
					<button
						className={`w-5 h-5 cursor-grab drag-handle__custom`}
					>
						<MdDragIndicator
							className={`w-5 h-5 text-card-foreground`}
						/>
					</button>
				</div>
			</CardTitle>
		</CardHeader>
	);
};

export default NodeHeader;
