import React from "react";

import { CardContent } from "@/components/ui/card";
import FileInputNode from "./input-nodes/FileInputNode";
import URLInputNode from "./input-nodes/UrlInputNode";
import TextInputNode from "./input-nodes/TextInputNode";
import NumberInputNode from "./input-nodes/NumberInputNode";
import { InputTypesEnum, NodeInputProps } from "../../interface";

const NodeContext = ({
	inputs,
	nodeId,
}: {
	inputs: NodeInputProps[];
	nodeId: string;
}) => {
	return (
		<CardContent className={`p-0 px-3 space-y-2`}>
			{inputs.map((input, index) => (
				<GetInputNode nodeId={nodeId} key={input.id} input={input} />
			))}
		</CardContent>
	);
};

export default NodeContext;

export const GetInputNode = ({
	input,
	nodeId,
}: {
	input: NodeInputProps;
	nodeId: string;
}) => {
	switch (input.inputType) {
		case InputTypesEnum.TEXT:
			return <TextInputNode input={input} nodeId={nodeId} />;
		case InputTypesEnum.NUMBER:
			return <NumberInputNode input={input} nodeId={nodeId} />;
		case InputTypesEnum.FILE:
			return <FileInputNode input={input} nodeId={nodeId} />;
		case InputTypesEnum.URL:
			return <URLInputNode input={input} nodeId={nodeId} />;
		default:
			return null;
	}
};
