import React from "react";
import { FaThList } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { Button } from "@/components/ui/button";

// Define View Enum for consistency
export enum ViewEnum {
	GRID = "grid",
	TABLE = "table",
}

// Props for Reusability
interface NodgeLayoutSwitchProps {
	currentView: ViewEnum;
	onViewChange: (view: ViewEnum) => void;
}

const NodgeLayoutSwitch: React.FC<NodgeLayoutSwitchProps> = ({
	currentView,
	onViewChange,
}) => {
	return (
		<div className="flex space-x-2">
			<Button
				variant={currentView === ViewEnum.GRID ? "default" : "outline"}
				className={`w-8 h-8 p-1`}
				onClick={() => onViewChange(ViewEnum.GRID)}
				aria-label="Grid view"
			>
				<IoGrid className="h-4 w-4" />
			</Button>
			<Button
				variant={currentView === ViewEnum.TABLE ? "default" : "outline"}
				className={`w-8 h-8 p-1`}
				onClick={() => onViewChange(ViewEnum.TABLE)}
				aria-label="Table view"
			>
				<FaThList className="h-4 w-4" />
			</Button>
		</div>
	);
};

export default NodgeLayoutSwitch;
