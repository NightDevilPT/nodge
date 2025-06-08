import React from "react";
import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { SidebarEnum } from "@/components/providers/view-layout-provider";

interface NodgeSidebarSwitchProps {
	currentView: SidebarEnum;
	onViewChange: (view: SidebarEnum) => void;
}

const NodgeSidebarSwitch: React.FC<NodgeSidebarSwitchProps> = ({
	currentView,
	onViewChange,
}) => {
	return (
		<div className="flex space-x-2">
			<Button
				variant={
					currentView === SidebarEnum.ICON ? "default" : "outline"
				}
				className="w-8 h-8 p-1"
				onClick={() => onViewChange(SidebarEnum.ICON)}
				aria-label="Icons only view"
			>
				<PanelLeftClose className="h-4 w-4" />
			</Button>
			<Button
				variant={
					currentView === SidebarEnum.ICON_TEXT
						? "default"
						: "outline"
				}
				className="w-8 h-8 p-1"
				onClick={() => onViewChange(SidebarEnum.ICON_TEXT)}
				aria-label="Icons with text view"
			>
				<PanelLeftOpen className="h-4 w-4" />
			</Button>
		</div>
	);
};

export default NodgeSidebarSwitch;
