import { CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React from "react";
import { MdDeleteOutline, MdDelete } from "react-icons/md";

interface NodeHeaderProps {
	label: string;
	icon: React.ElementType;
}

const NodeHeader = ({ label, icon: Icon }: NodeHeaderProps) => {
	return (
		<CardHeader className={`min-w-80 p-0 px-3 py-3 bg-background`}>
			<CardTitle
				className={`min-w-80 flex justify-between items-center gap-3`}
			>
				<div
					className={`w-auto h-auto flex justify-start items-center gap-2`}
				>
					<Icon className={"w-4 h-4"} />
					<Label className={`text-sm`}>{label}</Label>
				</div>
				<div
					className={`w-auto h-auto flex justify-between items-center gap-2`}
				></div>
			</CardTitle>
		</CardHeader>
	);
};

export default NodeHeader;
