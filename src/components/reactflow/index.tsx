import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import Tooltip from "./toolBarLayout";
import FlowEditor from "./flow-editor";

const ReactFlowSetup = () => {
	return (
		<ReactFlowProvider>
			<div className={`w-full h-screen grid grid-rows-[80px,_1fr]`}>
				<Tooltip />
				<div className={`w-full h-full relative`}>
					<FlowEditor />
				</div>
			</div>
		</ReactFlowProvider>
	);
};

export default ReactFlowSetup;
