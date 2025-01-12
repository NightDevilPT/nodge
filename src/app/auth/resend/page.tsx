"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NodgeLogo from "@/components/shared/logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmailFormData, emailSchema } from "../../../schema/resend";

export default function ForgetPasswordPage() {
	const router = useRouter();
	const [step, setStep] = useState<"forget-password" | "resend-verification">(
		"forget-password"
	);

	// Form initialization
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<EmailFormData>({
		resolver: zodResolver(emailSchema),
	});

	// **Form submission handler for forget password**
	const handleForgetPasswordSubmit = async (data: EmailFormData) => {
		try {
			const response = await fetch("/api/forget-password", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) throw new Error("Failed to send reset link.");

			alert("Password reset link sent to your email.");
		} catch (error) {
			console.error("Forget Password Error:", error);
			alert("An error occurred. Please try again later.");
		}
	};

	// **Form submission handler for resend verification**
	const handleResendVerificationSubmit = async (data: EmailFormData) => {
		try {
			const response = await fetch("/api/resend-verification", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok)
				throw new Error("Failed to resend verification email.");

			alert("Verification email resent successfully.");
		} catch (error) {
			console.error("Resend Verification Error:", error);
			alert("An error occurred. Please try again later.");
		}
	};

	return (
		<div className="bg-background min-h-screen flex justify-center items-center px-4">
			<Card className="w-full max-w-md shadow-lg">
				<CardHeader>
					<CardTitle className="grid gap-2 place-items-center">
						<NodgeLogo />
						<h3 className="text-lg mt-5 font-semibold">
							{step === "forget-password"
								? "Reset Your Password"
								: "Resend Verification"}
						</h3>
						<p className="text-sm text-muted-foreground mt-2">
							{step === "forget-password"
								? "Enter your registered email to receive the password reset link."
								: "Enter your email to resend the verification link."}
						</p>
					</CardTitle>
				</CardHeader>
				<CardContent>
					{step === "forget-password" && (
						<form
							onSubmit={handleSubmit(handleForgetPasswordSubmit)}
							className="space-y-6"
						>
							<div>
								<Label htmlFor="email">Email Address</Label>
								<Input
									id="email"
									type="email"
									placeholder="Enter your registered email"
									{...register("email")}
									className="mt-2"
								/>
								{errors.email && (
									<p className="text-red-600 text-sm mt-1">
										{errors.email.message}
									</p>
								)}
							</div>
							<Button
								type="submit"
								disabled={isSubmitting}
								className="w-full"
							>
								{isSubmitting
									? "Sending..."
									: "Send Reset Link"}
							</Button>
							<p className="text-sm text-center mt-2">
								Didn’t receive the verification email?{" "}
								<button
									type="button"
									className="text-primary underline"
									onClick={() =>
										setStep("resend-verification")
									}
								>
									Resend Verification
								</button>
							</p>
						</form>
					)}

					{step === "resend-verification" && (
						<form
							onSubmit={handleSubmit(
								handleResendVerificationSubmit
							)}
							className="space-y-6"
						>
							<div>
								<Label htmlFor="email">Email Address</Label>
								<Input
									id="email"
									type="email"
									placeholder="Enter your registered email"
									{...register("email")}
									className="mt-2"
								/>
								{errors.email && (
									<p className="text-red-600 text-sm mt-1">
										{errors.email.message}
									</p>
								)}
							</div>
							<Button
								type="submit"
								disabled={isSubmitting}
								className="w-full"
							>
								{isSubmitting
									? "Resending..."
									: "Resend Verification Email"}
							</Button>
							<p className="text-sm text-center mt-2">
								Want to reset your password instead?{" "}
								<button
									type="button"
									className="text-primary underline"
									onClick={() => setStep("forget-password")}
								>
									Reset Password
								</button>
							</p>
						</form>
					)}

					<p className="text-sm text-center mt-4">
						Back to{" "}
						<Link
							href="/auth/login"
							className="text-primary underline"
						>
							Login
						</Link>
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
