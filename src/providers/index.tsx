import React from "react";
import NextUiSetup from "./NextUiSetup";

const CombinedProviders = ({ children }: { children: React.ReactNode }) => {
	return <NextUiSetup>{children}</NextUiSetup>;
};

export default CombinedProviders;
