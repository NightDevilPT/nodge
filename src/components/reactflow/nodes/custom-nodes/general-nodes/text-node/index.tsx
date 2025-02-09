import React from "react";

import BaseNode from "../../../base-node";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { generateUuid } from "@/lib/uuid-generator";
import { AppNode } from "@/components/reactflow/interface";
import NodgeHandle, { NodgeType } from "@/components/shared/nodge-handle";

export const TextNode = ({ data, id }: AppNode) => {
	const { header } = data;
	const [text, setText] = React.useState<string>("");
	return (
		<BaseNode header={header} nodeId={id}>
			<div className="w-full h-auto grid grid-cols-1 gap-0 relative">
				<Label>Enter the text</Label>
				<Input
					className="mt-2"
					type="text"
					value={text}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						setText(event.target.value)
					}
				/>
				<NodgeHandle type={NodgeType.source} id={generateUuid()} />
			</div>
		</BaseNode>
	);
};
