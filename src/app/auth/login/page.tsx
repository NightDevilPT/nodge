"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NodgeLogo from "@/components/shared/logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginFormData, loginSchema } from "../../../schema/login";
import Link from "next/link";
import { commonStyle } from "@/lib/utils";

// SignupForm Component
export default function SignupForm() {
	const router = useRouter();

	// Initializing react-hook-form with Zod validation schema
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	// Form submission handler
	const onSubmit = async (data: LoginFormData) => {
		try {
			const response = await fetch("/api/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const { message } = await response.json();
				alert(`Signup failed: ${message}`);
				return;
			}

			alert("Signup successful! Redirecting to login...");
			router.push("/login");
		} catch (error) {
			console.error("Signup error:", error);
			alert("An unexpected error occurred. Please try again.");
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
							{isSubmitting ? "Loging..." : "Login"}
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
