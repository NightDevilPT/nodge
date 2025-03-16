"use client";

import React, { useState, useEffect } from "react";
import { TbEdit, TbEye, TbTrash } from "react-icons/tb";
import { commonStyle } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import NodgeLayoutSwitch, {
	ViewEnum,
} from "@/components/shared/nodge-layout-switch";
import { WorkflowCard } from "./_components/workflow-card";
import sampleData from "@/dummy-data/workflow-dummy-data";
import NodgeGridCard from "@/components/shared/nodge-grid-card";
import NodgeTable, { ColumnConfig } from "@/components/shared/nodge-table";
import NodgePaginationComponent from "@/components/shared/nodge-pagination";

export default function Workflow() {
	const itemsPerPage = 10;
	const totalPageCount = Math.ceil(sampleData.length / itemsPerPage);

	const [view, setView] = useState<ViewEnum>(ViewEnum.TABLE);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [data, setData] = useState(sampleData.slice(0, itemsPerPage));

	// Handle page change
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	// Update data when currentPage changes
	useEffect(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		setData(sampleData.slice(startIndex, endIndex));
		console.log(sampleData.slice(startIndex, endIndex), "CONSLING");
	}, [currentPage]);

	// Action Handlers
	const handleView = (id: string) => alert(`View User ID: ${id}`);
	const handleEdit = (id: string) => alert(`Edit User ID: ${id}`);
	const handleDelete = (id: string) => alert(`Delete User ID: ${id}`);

	// Column Definitions
	const columns: ColumnConfig<{
		id: string;
		name: string;
		email: string;
		role: string;
		status: string;
		actions?: React.ElementType;
	}>[] = [
		{ field: "id", headerName: "ID", sortable: true, width: "10%" },
		{ field: "name", headerName: "Name", sortable: true, width: "20%" },
		{ field: "email", headerName: "Email", sortable: true, width: "25%" },
		{ field: "role", headerName: "Role", sortable: true, width: "15%" },
		{
			field: "status",
			headerName: "Status",
			sortable: true,
			width: "15%",
			renderCell: (item) => (
				<span
					className={`px-3 py-1 mt-2 rounded-full text-xs ${
						item.status === "Active"
							? "bg-green-200 text-green-800"
							: "bg-red-200 text-red-800"
					}`}
				>
					{item.status}
				</span>
			),
		},
		{
			field: "actions",
			headerName: "Actions",
			width: "15%",
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
				<NodgeLayoutSwitch currentView={view} onViewChange={setView} />
			</div>
			{view === ViewEnum.GRID && (
				<NodgeGridCard
					data={data}
					renderCard={(item) => <WorkflowCard {...item} />}
				/>
			)}
			{view === ViewEnum.TABLE && (
				<div className="w-full h-auto">
					<NodgeTable data={data} columns={columns} />
				</div>
			)}
			<NodgePaginationComponent
				currentPage={currentPage}
				onPageChange={handlePageChange}
				totalPage={totalPageCount}
			/>
		</main>
	);
};

