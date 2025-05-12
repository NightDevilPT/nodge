import axiosInstance from "@/lib/api-instance";

class ApiService {
	constructor(private endpoint: string) {}

	// === GET ALL ===
	async getAll<T>(url: string, params?: Record<string, string | number | boolean>): Promise<T> {
		// Convert params object to URLSearchParams
		const queryParams = new URLSearchParams();
		
		if (params) {
		  Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
			  queryParams.append(key, String(value));
			}
		  });
		}
	  
		const endpoint = `${this.endpoint}/${url}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
		
		const response = await axiosInstance.get(endpoint);
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
	async get<T>(endPoint:string): Promise<T> {
		return (await axiosInstance.get(this.endpoint + `/${endPoint}`)).data as T; 
	}
}

export default ApiService;
