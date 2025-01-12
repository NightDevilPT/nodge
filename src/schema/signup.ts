import { z } from "zod";

// Form validation schema using Zod
export const signupSchema = z
	.object({
		username: z.string().min(3, "Username must be at least 3 characters"),
		email: z.string().email("Please enter a valid email address"),
		password: z.string().min(6, "Password must be at least 6 characters"),
		confirmPassword: z.string().min(6, "Password confirmation is required"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Passwords do not match",
	});

export type SignupFormData = z.infer<typeof signupSchema>;
