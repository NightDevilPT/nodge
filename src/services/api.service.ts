import axiosInstance from "@/lib/api-instance";

class ApiService<T> {
	constructor(private endpoint: string) {}

	// === GET ALL ===
	async getAll(): Promise<T[]> {
		const response = await axiosInstance.get<T[]>(this.endpoint);
		return response.data;
	}

	// === GET BY ID ===
	async getById(id: string): Promise<T> {
		const response = await axiosInstance.get<T>(`${this.endpoint}/${id}`);
		return response.data;
	}

	// === POST (CREATE) ===
	async create(data: Partial<T>): Promise<T> {
		const response = await axiosInstance.post<T>(this.endpoint, data);
		return response.data;
	}

	// === PUT (UPDATE) ===
	async update(id: string, data: Partial<T>): Promise<T> {
		const response = await axiosInstance.put<T>(
			`${this.endpoint}/${id}`,
			data
		);
		return response.data;
	}

	// === DELETE ===
	async delete(id: string): Promise<void> {
		await axiosInstance.delete(`${this.endpoint}/${id}`);
	}
}

export default ApiService;
