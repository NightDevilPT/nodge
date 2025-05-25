"use client";

import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactFlowProvider } from "@xyflow/react";
import React, { useEffect, useState } from "react";

import { Label } from "../ui/label";
import FlowEditor from "./flow-editor";
import { toast } from "@/hooks/use-toast";
import ToolBarLayout from "./toolBarLayout";
import ApiService from "@/services/api.service";
import { NodgeThemeToggle } from "../shared/nodge-theme-toggle";
import { WorkflowResponse } from "@/interface/workflow.interface";

const ReactFlowSetup = ({ workflowId }: { workflowId: string }) => {
	const router = useRouter();
	const workflowApiService = new ApiService("/workflow/get-workflows");
	const [workflow, setWorkflow] = useState<WorkflowResponse | null>(null);
	if (!workflowId) router.push("workflow");

	const fetchWorkflowById = async (workflowId: string) => {
		try {
			const response = await workflowApiService.getById<{
				data: WorkflowResponse;
				status: number;
				message: string;
			}>(workflowId);
			console.log(response);
			if (response.status !== 200) {
				toast({
					title: "Error",
					description: response.message,
					variant: "destructive",
				});
			}
			setWorkflow(response.data);
		} catch (err: any) {
			console.log(err);
			router.push("/workflow");
		}
	};

	useEffect(() => {
		fetchWorkflowById(workflowId);
	}, [workflowId]);

	if (!workflow)
		return (
			<div className="w-full h-screen bg-background flex justify-center items-center flex-col gap-2">
				<LoaderIcon className="w-16 h-16 animate-spin text-primary" />
				<Label className="text-xl">Loading workflow...</Label>
			</div>
		);

	return (
		<ReactFlowProvider>
			<div className={`w-full h-screen grid grid-rows-[80px,_1fr]`}>
				<div
					className={`w-full px-5 h-full flex justify-between bg-background items-center border-b-[1px] border-b-secondary`}
				>
					<h1 className={`text-xl`}>{workflow?.name}</h1>
					<NodgeThemeToggle />
				</div>
				<div
					className={`w-full h-full grid grid-cols-[320px,_1fr] gap-2`}
				>
					<div
						className={`w-full h-full border-r-[1px] border-b-secondary bg-background p-3`}
					>
						<ToolBarLayout />
					</div>
					<div className={`w-full h-full relative`}>
						<FlowEditor />
					</div>
				</div>
			</div>
		</ReactFlowProvider>
	);
};

export default ReactFlowSetup;
