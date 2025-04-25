"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ApiService from "@/services/api.service";
import { Button } from "@/components/ui/button";
import NodgeLogo from "@/components/shared/logo";
import { OTPFormData, otpSchema } from "../../../schema/otp";
import { InputOTPWithSeparator } from "@/components/shared/out-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OTPVerificationPage() {
	const { toast } = useToast();
	const router = useRouter();
	const apiService = new ApiService("/user/verify");
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");

	// Form hook with Zod resolver
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<OTPFormData>({
		resolver: zodResolver(otpSchema),
	});

	// Handle OTP change
	const handleOTPChange = (otpValue: string) => {
		setValue("otp", otpValue); // Set OTP value in form state
	};

	// Form submission
	const onSubmit = async (data: OTPFormData) => {
		setIsSubmitting(true);
		try {
			// Call the ApiService create method to verify OTP
			const response = await apiService.create<
				{ message: string },
				{ otp: string; email: string }
			>('',{
				otp: data.otp,
				email: data.email,
			});

			// Show success toast
			toast({
				title: "Success",
				description: response.message,
				variant: "success",
			});

			// Redirect to dashboard after successful verification
			router.push("/");
		} catch (error: any) {
			// Handle error and show toast
			console.error("Verification error:", error);
			toast({
				title: "Verification Failed",
				description:
					error.message ||
					"An unexpected error occurred. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="bg-background min-h-screen flex justify-center items-center px-4">
			<Card className="w-full max-w-md shadow-lg">
				<CardHeader>
					<CardTitle className="grid gap-2 place-items-center">
						<NodgeLogo />
						<h3 className="text-lg mt-5 font-semibold">
							Verify Your OTP
						</h3>
						<p className="text-sm text-muted-foreground mt-2">
							Enter the 6-digit OTP sent to your email or phone.
						</p>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-6"
					>
						{/* Email Field */}
						<div>
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="Enter your email"
								{...register("email")}
								className="mt-1"
							/>
							{errors.email && (
								<p className="text-red-600 text-sm mt-1">
									{errors.email.message}
								</p>
							)}
						</div>
						<div className="grid grid-cols-1 gap-0 w-full place-content-center place-items-center">
							<div className="mt-2 w-full flex justify-center items-center">
								<InputOTPWithSeparator
									onChange={handleOTPChange}
								/>
							</div>
							{errors.otp && (
								<p className="text-red-600 text-sm mt-1">
									{errors.otp.message}
								</p>
							)}
							{errorMessage && (
								<p className="text-red-600 text-sm mt-1">
									{errorMessage}
								</p>
							)}
						</div>

						<Button
							type="submit"
							disabled={isSubmitting}
							className="w-full bg-primary text-white"
						>
							{isSubmitting ? "Verifying..." : "Verify OTP"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
