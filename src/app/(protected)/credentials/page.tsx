"use client";
import React, { useState, useEffect } from "react";
import { TbEdit, TbEye, TbPlus, TbTrash, TbKey } from "react-icons/tb";
import { commonStyle } from "@/lib/utils";
import NodgeLayoutSwitch, {
	ViewEnum,
} from "@/components/shared/nodge-layout-switch";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import ApiService from "@/services/api.service";
import { Button } from "@/components/ui/button";
import {
	CREDENTIAL_TYPES,
	CredentialResponse,
	CredentialType,
} from "@/interface/credential.interface";
import { CommonApiResponse } from "@/interface/common.interface";
import NodgeGridCardLayout from "@/components/shared/nodge-grid-card";
import NodgeTable, { ColumnConfig } from "@/components/shared/nodge-table";
import NodgePaginationComponent from "@/components/shared/nodge-pagination";
import { CredentialCard } from "./_components/credential-card";
import { useView } from "@/components/providers/view-layout-provider";
import { NodgeWorkflowCardSkeleton } from "@/components/shared/nodge-skeleton/card";
import { NodgeWorkflowTableSkeleton } from "@/components/shared/nodge-skeleton/table";
import CredentialForm from "./_components/credential-form";
import { SecurityUtils } from "@/lib/security-utils";
import { generateUuid } from "@/lib/uuid-generator";

export default function Credentials() {
	const { toast } = useToast();
	const apiService = new ApiService("/credential");
	const { view, setView } = useView();

	const [itemsPerPage, setItemsPerPage] = useState<number>(5);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [data, setData] = useState<CredentialResponse[]>([]);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [sortBy, setSortBy] = useState<string>("createdAt");
	const [sortOrder, setSortOrder] = useState<string>("desc");
	const [open, setOpen] = useState(false);
	const [editingCredential, setEditingCredential] = useState<
		CredentialResponse | undefined
	>(undefined);

	const fetchCredentials = async () => {
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
				CommonApiResponse<CredentialResponse[]>
			>("get-credentials", params);
			if (response?.data) {
				setData(response.data);
				setTotalPages(response.meta?.totalPages || 1);
			}
		} catch (error: any) {
			console.error("Error fetching credentials:", error);
			toast({
				title: "Error",
				description: error.message || "Failed to fetch credentials",
				variant: "destructive",
			});
			setData([]);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchCredentials();
	}, [currentPage, searchQuery, sortBy, sortOrder, itemsPerPage]);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleItemsPerPageChange = (newLimit: number) => {
		setItemsPerPage(newLimit);
		setCurrentPage(1);
	};

	const handleEdit = (id: string) => {
		const credentialToEdit = data.find(
			(credential) => credential.id === id
		);
		if (credentialToEdit) {
			setEditingCredential(credentialToEdit);
			setOpen(true);
		}
	};

	const handleDelete = async (id: string) => {
		if (confirm("Are you sure you want to delete this credential?")) {
			try {
				await apiService.delete(`delete/${id}`);
				toast({
					title: "Success",
					description: "Credential deleted successfully",
					variant: "success",
				});
				fetchCredentials();
			} catch (error: any) {
				toast({
					title: "Error",
					description: error.message || "Failed to delete credential",
					variant: "destructive",
				});
			}
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleString();
	};

	const columns: ColumnConfig<CredentialResponse>[] = [
		{
			field: "icon",
			headerName: "Icon",
			sortable: true,
			width: "15%",
			renderCell: (item) => {
				const credentialConfig = CREDENTIAL_TYPES[item.credentialType];
				const IconComponent = credentialConfig?.defaultIcon;
				return (
					IconComponent && (
						<div className="w-full h-auto flex justify-center items-center">
							<IconComponent className="w-5 h-5" />
						</div>
					)
				);
			},
		},
		{
			field: "credentialType",
			headerName: "Type",
			sortable: true,
			width: "15%",
			renderCell: (item) => {
				const credentialConfig = CREDENTIAL_TYPES[item.credentialType];
				return (
					<Badge
						className={`${credentialConfig.bgColor}`}
					>
						{item.credentialType}
					</Badge>
				);
			},
		},
		{
			field: "id",
			headerName: "Keys",
			sortable: false,
			width: "25%",
			renderCell: (item) => {
				const decryptedValue =
					SecurityUtils.decryptSecureCredentialValue(
						item.credentialsValue as any
					);
				const keys = Object.keys(decryptedValue || {});
				return (
					<div className="flex flex-wrap gap-1">
						{keys.length > 0 ? (
							keys.slice(0, 2).map((key, index) => (
								<Badge
									key={key + index}
									variant="outline"
									className="text-xs"
								>
									{key}
								</Badge>
							))
						) : (
							<span className="text-gray-400 text-xs">
								No keys
							</span>
						)}
						{keys.length > 2 && (
							<Badge variant="outline" className="text-xs">
								+{keys.length - 2} more
							</Badge>
						)}
					</div>
				);
			},
		},
		{
			field: "updatedAt",
			headerName: "Last Updated",
			sortable: true,
			width: "20%",
			renderCell: (item) => (
				<span className="w-full">{formatDate(item.updatedAt)}</span>
			),
		},
		{
			field: "actions",
			headerName: "Actions",
			width: "10%",
			renderCell: (item) => (
				<div className="flex space-x-2">
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
				<h2 className="text-xl font-semibold">Credentials</h2>
				<div className="flex items-center gap-3">
					<Button
						className={`w-8 h-8 p-1 ${commonStyle.gradientBg}`}
						variant="default"
						onClick={() => setOpen(true)}
						title="Add new credential"
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
							className="grid grid-cols-3 max-lg:grid-cols-1 gap-5"
							renderCard={(item) => (
								<CredentialCard
									id={item.id}
									credentialType={
										item.credentialType as CredentialType
									}
									credentialsValue={
										typeof item.credentialsValue ===
										"string"
											? SecurityUtils.decryptSecureCredentialValue(
													item.credentialsValue
											  ) || {}
											: item.credentialsValue || {}
									}
									updatedAt={item.updatedAt}
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
									enabled: false,
									fileName: "credentials-export",
									exportAllData: false,
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

			<CredentialForm
				open={open}
				setOpen={(value) => {
					setOpen(value);
					if (!value) {
						setEditingCredential(undefined);
					}
				}}
				mode={editingCredential ? "edit" : "create"}
				credential={editingCredential}
				onSuccess={() => {
					fetchCredentials();
					setEditingCredential(undefined);
				}}
			/>
		</main>
	);
}
