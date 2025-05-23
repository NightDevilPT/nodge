"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import ApiService from "@/services/api.service";
import { Button } from "@/components/ui/button";
import NodgeLogo from "@/components/shared/logo";
import { EmailFormData, emailSchema } from "../../../schema/resend";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function ForgetPasswordPage() {
	const router = useRouter();
	const { toast } = useToast();
	const [step, setStep] = useState<"forget-password" | "resend-verification">(
		"forget-password"
	);

	const apiServiceForgetPassword = new ApiService("/user/forget");
	const apiServiceResendVerification = new ApiService(
		"/user/verify/resend-verification"
	);

	// Form initialization
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<EmailFormData>({
		resolver: zodResolver(emailSchema),
	});

	// Form submission handler for forget password
	const handleForgetPasswordSubmit = async (data: EmailFormData) => {
		try {
			const response = await apiServiceForgetPassword.create<
				{ message: string, status:number },
				EmailFormData
			>('',data);

			toast({
				title: "Success",
				description: "Password reset link sent to your email.",
				variant: "success",
			});
			router.push("/auth/update-password");
		} catch (error: any) {
			console.error("Forget Password Error:", error);
			toast({
				title: "Error",
				description:
					error.response?.data?.message ||
					"Failed to send reset link.",
				variant: "destructive",
			});
		}
	};

	// Form submission handler for resend verification
	const handleResendVerificationSubmit = async (data: EmailFormData) => {
		try {
			const response = await apiServiceResendVerification.create<
				{ message: string },
				EmailFormData
			>('',data);

			if(response.message==="Email is already verified."){
				toast({
					title: "Warning",
					description: response.message,
					variant: "warning",
				});
				router.push("/auth/login");
				return
			}


			toast({
				title: "Success",
				description: "Verification email resent successfully.",
				variant: "success",
			});
			router.push("/auth/verify");
		} catch (error: any) {
			console.error("Resend Verification Error:", error);
			toast({
				title: "Error",
				description:
					error.response?.data?.message ||
					"Failed to resend verification email.",
				variant: "destructive",
			});
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
