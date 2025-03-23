import React from "react";
import BaseNode from "../../../base-node";
import { AppNode } from "@/components/reactflow/interface";
import { InputSwitch } from "../../../base-node/inputs";

const FileNode = ({ data, id }: AppNode) => {
	return (
		<BaseNode header={data.header} nodeId={id}>
			{data?.inputs?.map((input, index) => {
				const CurrentInput = InputSwitch[input.type];
				return <CurrentInput key={index} nodeId={id} input={input} />;
			})}
		</BaseNode>
	);
};

export default FileNode;
