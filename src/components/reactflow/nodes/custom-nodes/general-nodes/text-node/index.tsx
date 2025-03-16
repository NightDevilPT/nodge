import React from "react";

import BaseNode from "../../../base-node";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AppNode } from "@/components/reactflow/interface";
import { useUpdateNodeData } from "@/hooks/update-node-data";
import { NodgeHandle, NodgeType } from "@/components/shared/nodge-handle";

export const TextNode = ({ data, id }: AppNode) => {
	const { header, type, isInitialNode } = data;
	const [text, setText] = React.useState<string>("");
	const updateNodeData = useUpdateNodeData();

	return (
		<BaseNode header={header} nodeId={id}>
			<div className="w-full h-auto grid grid-cols-1 gap-0 relative">
				<Label>Enter the text</Label>
				<Input
					className="mt-2"
					type="text"
					value={text}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						setText(event.target.value);
						updateNodeData(id, { inputValue: event.target.value });
					}}
				/>
				{!isInitialNode && (
					<NodgeHandle
						type={NodgeType.target}
						isConnectable={true}
						nodeId={id}
					/>
				)}
				<NodgeHandle
					type={NodgeType.source}
					isConnectable={true}
					nodeId={id}
				/>
			</div>
		</BaseNode>
	);
};
