import React from "react";
import NextUiSetup from "./NextUiSetup";

const RootProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<NextUiSetup>
			<div className="w-full h-screen overflow-hidden">{children}</div>
		</NextUiSetup>
	);
};

export default RootProvider;
