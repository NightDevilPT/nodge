"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import NodgeLogo from "@/components/shared/logo";
import { InputOTPWithSeparator } from "@/components/shared/out-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OTPFormData, otpSchema } from "../../../schema/otp";

export default function OTPVerificationPage() {
	const router = useRouter();
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
		setErrorMessage("");

		try {
			const response = await fetch("/api/verify-otp", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ otp: data.otp }),
			});

			if (!response.ok) {
				const { message } = await response.json();
				setErrorMessage(`Verification failed: ${message}`);
				setIsSubmitting(false);
				return;
			}

			alert("OTP Verified Successfully! Redirecting...");
			router.push("/dashboard");
		} catch (error) {
			console.error("Verification error:", error);
			setErrorMessage("An unexpected error occurred. Please try again.");
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
