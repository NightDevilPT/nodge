import axiosInstance from "@/lib/api-instance";

class ApiService {
	constructor(private endpoint: string) {}

	// === GET ALL ===
	async getAll<T>(url:string): Promise<T> {
		const response = await axiosInstance.get(this.endpoint+ `/${url}`);
		return response.data as T;
	}

	// === GET BY ID ===
	async getById<T>(id: string): Promise<T> {
		const response = await axiosInstance.get(this.endpoint + `/${id}`);
		return response.data as T;
	}

	// === POST (CREATE) ===
	async create<T, R>(url:string,data: R): Promise<T> {
		const response = await axiosInstance.post(this.endpoint+`/${url}`, data);
		return response.data as T;
	}

	// === PUT (UPDATE) ===
	async update<T, R>(id: string, data: R): Promise<T> {
		const response = await axiosInstance.put(this.endpoint + `/${id}`, data);
		return response.data as T;
	}

	// === DELETE ===
	async delete(id: string): Promise<void> {
		await axiosInstance.delete(this.endpoint + `/${id}`);
	}

	// === DELETE ===
	async get(endPoint:string): Promise<any> {
		return await axiosInstance.get(this.endpoint + `/${endPoint}`); 
	}
}

export default ApiService;
