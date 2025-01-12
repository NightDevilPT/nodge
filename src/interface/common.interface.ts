export interface MetaInfo {
	totalPages: number;
	currentPage: number;
	isPrevious: boolean;
	isNext: boolean;
	totalItems: number;
	itemsPerPage: number;
}

export interface CommonApiResponse<T> {
	data: T;
	meta: MetaInfo | null;
	message?: string;
	status?: number;
}
