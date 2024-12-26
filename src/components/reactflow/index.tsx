import React from "react";
import FlowEditor from "./flow-editor";
import ToolBarLayout from "./toolBarLayout";
import { ReactFlowProvider } from "@xyflow/react";

const ReactFlowSetup = () => {
	return (
		<ReactFlowProvider>
			<div className={`w-full h-screen grid grid-rows-[80px,_1fr]`}>
				<div
					className={`w-full px-5 h-full flex justify-between bg-background items-center border-b-[1px] border-b-secondary`}
				>
					<h1 className={`text-xl`}>Workflow 1</h1>
				</div>
				<div
					className={`w-full h-full grid grid-cols-[350px,_1fr] gap-2`}
				>
					<div
						className={`w-full h-full border-r-[1px] border-b-secondary bg-background p-3`}
					>
						<ToolBarLayout />
					</div>
					<div className={`w-full h-full relative`}>
						<FlowEditor />
					</div>
				</div>
			</div>
		</ReactFlowProvider>
	);
};

export default ReactFlowSetup;
