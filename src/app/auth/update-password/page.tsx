"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	UpdatePasswordFormData,
	updatePasswordSchema,
} from "../../../schema/update-password";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import ApiService from "@/services/api.service";
import { Button } from "@/components/ui/button";
import NodgeLogo from "@/components/shared/logo";
import { InputOTPWithSeparator } from "@/components/shared/out-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UpdatePasswordPage() {
	const router = useRouter();
	const { toast } = useToast();
	const apiService = new ApiService("/user/update-password");

	// Form hook
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<UpdatePasswordFormData>({
		resolver: zodResolver(updatePasswordSchema),
	});

	// Handle OTP input changes
	const handleOTPChange = (otpValue: string) => {
		setValue("otp", otpValue);
	};

	// Form submission
	const onSubmit = async (data: UpdatePasswordFormData) => {
		try {
			// API call to update password
			await apiService.create<
				{ message: string },
				UpdatePasswordFormData
			>('',data);

			toast({
				title: "Success",
				description:
					"Password updated successfully! Redirecting to login...",
				variant: "success",
			});

			// Redirect to login page after success
			router.push("/auth/login");
		} catch (error: any) {
			console.error("Update Password Error:", error);

			toast({
				title: "Error",
				description:
					error.response?.data?.message ||
					"Failed to update password.",
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
							Update Your Password
						</h3>
						<p className="text-sm text-muted-foreground mt-2">
							Enter the OTP sent to your email and set a new
							password.
						</p>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-6"
					>
						{/* OTP Field */}
						<div>
							<div className="mt-2 flex justify-center">
								<InputOTPWithSeparator
									onChange={handleOTPChange}
								/>
							</div>
							{errors.otp && (
								<p className="text-red-600 text-sm mt-1">
									{errors.otp.message}
								</p>
							)}
						</div>

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

						{/* New Password Field */}
						<div>
							<Label htmlFor="newPassword">New Password</Label>
							<Input
								id="newPassword"
								type="password"
								placeholder="Enter your new password"
								{...register("newPassword")}
								className="mt-2"
							/>
							{errors.newPassword && (
								<p className="text-red-600 text-sm mt-1">
									{errors.newPassword.message}
								</p>
							)}
						</div>

						{/* Confirm Password Field */}
						<div>
							<Label htmlFor="confirmPassword">
								Confirm Password
							</Label>
							<Input
								id="confirmPassword"
								type="password"
								placeholder="Confirm your new password"
								{...register("confirmPassword")}
								className="mt-2"
							/>
							{errors.confirmPassword && (
								<p className="text-red-600 text-sm mt-1">
									{errors.confirmPassword.message}
								</p>
							)}
						</div>

						<Button
							type="submit"
							disabled={isSubmitting}
							className="w-full"
						>
							{isSubmitting ? "Updating..." : "Update Password"}
						</Button>
					</form>
					<p className="text-center text-sm mt-4">
						Remember your password?{" "}
						<a
							href="/auth/login"
							className="text-primary underline"
						>
							Login here
						</a>
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
