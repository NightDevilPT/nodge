"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commonStyle } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import ApiService from "@/services/api.service";
import { Button } from "@/components/ui/button";
import NodgeLogo from "@/components/shared/logo";
import { LoginFormData, loginSchema } from "../../../schema/login";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginForm() {
	const router = useRouter();
	const { toast } = useToast();
	const apiService = new ApiService("/user/login");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginFormData) => {
		try {
			const response = await apiService.create<
				{ status: number; message: string },
				LoginFormData
			>('',data);

			toast({
				title: "Login Successful",
				description: response.message,
				variant: "success",
			});

			router.push("/");
		} catch (error: any) {
			console.error("Login error:", error);

			// Display error toast
			toast({
				title: "Login Failed",
				description:
					error.response?.data?.message ||
					"An unexpected error occurred.",
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
					</CardTitle>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						{/* Email Field */}
						<div>
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="Enter your email"
								{...register("email")}
								className="mt-2"
							/>
							{errors.email && (
								<p className="text-red-600 text-xs mt-1">
									{errors.email.message}
								</p>
							)}
						</div>

						{/* Password Field */}
						<div className="mt-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								placeholder="Enter your password"
								{...register("password")}
								className="mt-2"
							/>
							{errors.password && (
								<p className="text-red-600 text-xs mt-1">
									{errors.password.message}
								</p>
							)}
							<Link
								href={"/auth/resend"}
								className={`w-full text-sm flex justify-end items-end ${commonStyle.gradientText}`}
							>
								Forget password
							</Link>
						</div>

						{/* Submit Button */}
						<Button
							type="submit"
							disabled={isSubmitting}
							className={`w-full mt-5 ${commonStyle.gradientBg}`}
						>
							{isSubmitting ? "Logging in..." : "Login"}
						</Button>
					</form>
					<p
						className={`w-full text-sm mt-2 text-center flex justify-center items-center gap-2`}
					>
						Create a new account?
						<Link
							href={"/auth/signup"}
							className={`text-primary ${commonStyle.gradientText}`}
						>
							Signup
						</Link>
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
