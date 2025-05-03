import React from "react";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export interface PaginationProps {
	currentPage: number;
	totalPage: number;
	itemsPerPage: number;
	onPageChange: (page: number) => void;
	onItemsPerPageChange?: (limit: number) => void;
}

const NodgePaginationComponent: React.FC<PaginationProps> = ({
	currentPage,
	totalPage,
	itemsPerPage,
	onPageChange,
	onItemsPerPageChange,
}) => {
	const pageNumbers = [];
	const maxVisiblePages = 5;
	const pageSizeOptions = [5, 10, 25, 50, 100];

	if (totalPage <= maxVisiblePages) {
		for (let i = 1; i <= totalPage; i++) {
			pageNumbers.push(i);
		}
	} else {
		pageNumbers.push(1);
		const startPage = Math.max(2, currentPage - 1);
		const endPage = Math.min(totalPage - 1, currentPage + 1);

		if (startPage > 2) pageNumbers.push(-1);
		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(i);
		}
		if (endPage < totalPage - 1) pageNumbers.push(-2);
		pageNumbers.push(totalPage);
	}

	return (
		<div className="flex gap-4 mt-4">
			<Pagination className="mt-0">
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							onClick={() =>
								onPageChange(Math.max(1, currentPage - 1))
							}
							className={
								currentPage === 1
									? "pointer-events-none opacity-50"
									: "cursor-pointer"
							}
						/>
					</PaginationItem>

					{pageNumbers.map((pageNum, index) =>
						pageNum < 0 ? (
							<PaginationItem key={`ellipsis-${index}`}>
								<PaginationEllipsis />
							</PaginationItem>
						) : (
							<PaginationItem key={pageNum}>
								<PaginationLink
									isActive={pageNum === currentPage}
									onClick={() => onPageChange(pageNum)}
									className="cursor-pointer"
								>
									{pageNum}
								</PaginationLink>
							</PaginationItem>
						)
					)}

					<PaginationItem>
						<PaginationNext
							onClick={() =>
								onPageChange(
									Math.min(totalPage, currentPage + 1)
								)
							}
							className={
								currentPage === totalPage
									? "pointer-events-none opacity-50"
									: "cursor-pointer"
							}
						/>
					</PaginationItem>

					<div className="flex items-center gap-2 ml-2">
						<Select
							value={itemsPerPage.toString()}
							onValueChange={(value) =>
								onItemsPerPageChange?.(Number(value))
							}
						>
							<SelectTrigger className="h-8 w-[70px]">
								<SelectValue placeholder={itemsPerPage} />
							</SelectTrigger>
							<SelectContent>
								{pageSizeOptions.map((option) => (
									<SelectItem
										key={option}
										value={option.toString()}
									>
										{option}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</PaginationContent>
			</Pagination>
		</div>
	);
};

export default NodgePaginationComponent;
