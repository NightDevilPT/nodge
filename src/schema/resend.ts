import { z } from "zod";

// **Validation Schema for Email Form**
export const emailSchema = z.object({
	email: z.string().email("Please enter a valid email address."),
});

export type EmailFormData = z.infer<typeof emailSchema>;
