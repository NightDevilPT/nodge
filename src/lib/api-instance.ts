import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

// Define the Axios instance with proper typing
const axiosInstance: AxiosInstance = axios.create({
	baseURL: "/api", // Base URL for your Next.js API
	headers: {
		"Content-Type": "application/json",
	},
});

// Add optional interceptors if needed
axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => response,
	(error: AxiosError) => {
		// Reject the promise with a properly typed error
		return Promise.reject(error.response?.data || error.message);
	}
);

export default axiosInstance;
