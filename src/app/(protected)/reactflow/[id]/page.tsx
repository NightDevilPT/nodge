import ReactFlow from "@/components/reactflow";
import React from "react";

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	return <ReactFlow workflowId={id} />;
}
