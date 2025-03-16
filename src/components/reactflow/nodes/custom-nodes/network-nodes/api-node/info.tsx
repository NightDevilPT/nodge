import React from "react";

import { Separator } from "@/components/ui/separator";
import { NodgeHoverCard } from "@/components/shared/nodge-hover-card";

const ApiNodeInfo = () => {
	return (
		<NodgeHoverCard>
			<div className={`w-full h-auto space-y-2`}>
				<h3 className={`w-full h-auto`}>Api Node</h3>
				<Separator orientation="horizontal" />
				<div className={`w-full h-auto p-2`}></div>
			</div>
		</NodgeHoverCard>
	);
};

export default ApiNodeInfo;
