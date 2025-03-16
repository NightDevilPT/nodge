export interface PaginationConfig<T = any> {
	currentPage: number;
	totalPage: number;
	limit: number;
	data: T[]; // Allow data to be an array of generic type T
}
