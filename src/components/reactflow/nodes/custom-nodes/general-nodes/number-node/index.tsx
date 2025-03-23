import React from "react";
import BaseNode from "../../../base-node";
import { InputSwitch } from "../../../base-node/inputs";
import { AppNode } from "@/components/reactflow/interface";

const NumberNode = ({ data, id }: AppNode) => {
	return (
		<BaseNode header={data.header} nodeId={id}>
			{data?.inputs?.map((input, index) => {
				const CurrentInput = InputSwitch[input.type];
				return <CurrentInput key={index} nodeId={id} input={input} />;
			})}
		</BaseNode>
	);
};

export default NumberNode;
