"use client";

import React, { useState, useEffect } from "react";
import { TbEdit, TbEye, TbPlus, TbTrash } from "react-icons/tb";

import { commonStyle } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import ApiService from "@/services/api.service";
import { Button } from "@/components/ui/button";
import NodgeLayoutSwitch, {
	ViewEnum,
} from "@/components/shared/nodge-layout-switch";
import WorkflowCreateButton from "./_components/workflow-form";
import { WorkflowResponse } from "@/interface/workflow.interface";
import { CommonApiResponse } from "@/interface/common.interface";
import NodgeTable, { ColumnConfig } from "@/components/shared/nodge-table";
import NodgePaginationComponent from "@/components/shared/nodge-pagination";
import NodgeGridCardLayout from "@/components/shared/nodge-grid-card";
import { WorkflowCard } from "./_components/workflow-card";
import { useView } from "@/components/providers/view-layout-provider";
import { NodgeWorkflowCardSkeleton } from "@/components/shared/nodge-skeleton/card";
import { NodgeWorkflowTableSkeleton } from "@/components/shared/nodge-skeleton/table";

export default function Workflow() {
	const { toast } = useToast();
	const apiService = new ApiService("/workflow");

	// Use the context for view management
	const { view, setView } = useView();
	const [itemsPerPage, setItemsPerPage] = useState<number>(5); // Move this to state
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [data, setData] = useState<WorkflowResponse[]>([]);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [sortBy, setSortBy] = useState<string>("createdAt");
	const [sortOrder, setSortOrder] = useState<string>("desc");
	// Add this state to your Workflow component:
	const [open, setOpen] = useState(false);
	const [editingWorkflow, setEditingWorkflow] = useState<
		WorkflowResponse | undefined
	>(undefined);

	// Fetch workflows from the API
	const fetchWorkflows = async () => {
		try {
			setIsLoading(true);
			const params = {
				page: currentPage,
				limit: itemsPerPage,
				sortBy,
				sortOrder,
				...(searchQuery && { search: searchQuery }),
			};

			const response = await apiService.getAll<
				CommonApiResponse<WorkflowResponse[]>
			>("get-workflows", params);
			if (response?.data) {
				setData(response.data);
				setTotalPages(response.meta?.totalPages || 1);
			}
		} catch (error: any) {
			console.error("Error fetching workflows:", error);
			toast({
				title: "Error",
				description: error.message || "Failed to fetch workflows",
				variant: "destructive",
			});
			setData([]);
		} finally {
			setIsLoading(false);
		}
	};

	// Handle page change
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	// Fetch data when currentPage, searchQuery, or sorting changes
	useEffect(() => {
		fetchWorkflows();
	}, [currentPage, searchQuery, sortBy, sortOrder, itemsPerPage]);

	// Action Handlers
	const handleView = (id: string) => {
		// Navigate to workflow detail page
		console.log(`View Workflow ID: ${id}`);
		// You can implement navigation here
	};

	// Update the handleEdit function in your Workflow component:
	const handleEdit = (id: string) => {
		const workflowToEdit = data.find((workflow) => workflow.id === id);
		if (workflowToEdit) {
			setEditingWorkflow(workflowToEdit);
			setOpen(true);
		}
	};

	const handleDelete = async (id: string) => {
		if (confirm("Are you sure you want to delete this workflow?")) {
			try {
				await apiService.delete(`/${id}`);
				toast({
					title: "Success",
					description: "Workflow deleted successfully",
					variant: "success",
				});
				fetchWorkflows(); // Refresh after deletion
			} catch (error: any) {
				toast({
					title: "Error",
					description: error.message || "Failed to delete workflow",
					variant: "destructive",
				});
			}
		}
	};

	// Format date string
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleString();
	};

	// Add this handler
	const handleItemsPerPageChange = (newLimit: number) => {
		setItemsPerPage(newLimit);
		setCurrentPage(1); // Reset to first page when changing limit
	};

	// Column Definitions
	const columns: ColumnConfig<WorkflowResponse>[] = [
		{ field: "name", headerName: "Name", sortable: true, width: "20%" },
		{
			field: "description",
			headerName: "Description",
			sortable: false,
			width: "20%",
			renderCell: (item) => (
				<span className="truncate block max-w-xs">
					{item.description || "No description"}
				</span>
			),
		},
		{
			field: "tags",
			headerName: "Tags",
			sortable: false,
			width: "15%",
			renderCell: (item) => (
				<div className="flex flex-wrap gap-1">
					{item.tags && item.tags.length > 0 ? (
						item.tags.slice(0, 2).map((tag, index) => (
							<Badge
								key={index}
								variant="outline"
								className="text-xs"
							>
								{tag}
							</Badge>
						))
					) : (
						<span className="text-gray-400 text-xs">No tags</span>
					)}
					{item.tags && item.tags.length > 2 && (
						<Badge variant="outline" className="text-xs">
							+{item.tags.length - 2} more
						</Badge>
					)}
				</div>
			),
		},
		{
			field: "triggerType",
			headerName: "Trigger",
			sortable: true,
			width: "10%",
			renderCell: (item) => (
				<Badge
					className={
						item.triggerType === "MANUAL"
							? "bg-blue-100 text-blue-800 hover:bg-blue-300"
							: item.triggerType === "SCHEDULED"
							? "bg-green-100 text-green-800 hover:bg-green-300"
							: "bg-purple-100 text-purple-800 hover:bg-purple-300"
					}
				>
					{item.triggerType || "MANUAL"}
				</Badge>
			),
		},
		{
			field: "isDraft",
			headerName: "Status",
			sortable: true,
			width: "10%",
			renderCell: (item) => (
				<Badge
					className={
						item.isDraft
							? "bg-yellow-100 text-yellow-800 hover:bg-yellow-300"
							: "bg-green-100 text-green-800 hover:bg-green-300"
					}
				>
					{item.isDraft ? "Draft" : "Active"}
				</Badge>
			),
		},
		{
			field: "isPublic",
			headerName: "Visibility",
			sortable: true,
			width: "10%",
			renderCell: (item) => (
				<Badge
					className={
						item.isPublic
							? "bg-yellow-100 text-yellow-800 hover:bg-yellow-300"
							: "bg-green-100 text-green-800 hover:bg-green-300"
					}
				>
					{item.isPublic ? "Public" : "Private"}
				</Badge>
			),
		},
		{
			field: "updatedAt",
			headerName: "Last Updated",
			sortable: true,
			width: "15%",
			renderCell: (item) => <span>{formatDate(item.updatedAt)}</span>,
		},
		{
			field: "actions",
			headerName: "Actions",
			width: "10%",
			renderCell: (item) => (
				<div className="flex space-x-2">
					<Button
						className="w-8 h-8 p-1"
						variant="outline"
						onClick={() => handleView(item.id)}
					>
						<TbEye />
					</Button>
					<Button
						className={`w-8 h-8 p-1 ${commonStyle.gradientBg}`}
						variant="default"
						onClick={() => handleEdit(item.id)}
					>
						<TbEdit />
					</Button>
					<Button
						className="w-8 h-8 p-1 !bg-gradient-to-tr !from-destructive !to-red-400 !text-white cursor-pointer"
						variant="destructive"
						onClick={() => handleDelete(item.id)}
					>
						<TbTrash />
					</Button>
				</div>
			),
		},
	];

	return (
		<main className="w-full h-full flex flex-col gap-3 p-3">
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-semibold">Workflow</h2>
				<div className="flex items-center gap-3">
					<WorkflowCreateButton
						setOpen={setOpen}
						open={open}
						workflow={editingWorkflow}
						onSuccess={() => {
							fetchWorkflows();
							setEditingWorkflow(undefined);
						}}
					/>
					<Button
						className={`w-8 h-8 p-1 ${commonStyle.gradientBg}`}
						variant="default"
						onClick={() => setOpen(true)}
					>
						<TbPlus />
					</Button>
					<NodgeLayoutSwitch
						currentView={view}
						onViewChange={setView}
					/>
				</div>
			</div>

			{isLoading ? (
				view === ViewEnum.GRID ? (
					<div className="grid grid-cols-2 gap-4">
						{Array.from({ length: 4 }).map((_, index) => (
							<NodgeWorkflowCardSkeleton key={index} />
						))}
					</div>
				) : (
					<NodgeWorkflowTableSkeleton />
				)
			) : (
				<>
					{view === ViewEnum.GRID && (
						<NodgeGridCardLayout
							data={data}
							className="grid grid-cols-2 max-lg:grid-cols-1 gap-5"
							renderCard={(item) => (
								<WorkflowCard
									{...item}
									onView={handleView}
									onEdit={handleEdit}
									onDelete={handleDelete}
								/>
							)}
						/>
					)}
					{view === ViewEnum.TABLE && (
						<div className="w-full h-auto">
							<NodgeTable
								data={data}
								columns={columns}
								showConfigMenu={true}
								exportOptions={{
									enabled: true,
									fileName: "my-data-export",
									exportAllData: false, // Only exports visible columns
								}}
							/>
						</div>
					)}
				</>
			)}
			<NodgePaginationComponent
				currentPage={currentPage}
				onPageChange={handlePageChange}
				totalPage={totalPages}
				itemsPerPage={itemsPerPage}
				onItemsPerPageChange={handleItemsPerPageChange}
			/>
		</main>
	);
}
