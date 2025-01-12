import { z } from "zod";

// Zod schema for OTP validation
export const otpSchema = z.object({
  otp: z
	.string()
	.length(6, { message: "OTP must be exactly 6 digits" })
	.regex(/^\d+$/, { message: "OTP must contain only numbers" }),
});

export type OTPFormData = z.infer<typeof otpSchema>;