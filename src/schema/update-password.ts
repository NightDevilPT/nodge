import { z } from "zod";

// **Validation Schema**
export const updatePasswordSchema = z
	.object({
		otp: z
			.string()
			.length(6, "OTP must be exactly 6 digits")
			.regex(/^\d+$/, "OTP must contain only numbers"),
		email: z.string().email("Please enter a valid email address."),
		newPassword: z
			.string()
			.min(8, "Password must be at least 8 characters long"),
		confirmPassword: z.string().min(8, "Please confirm your password"),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;
