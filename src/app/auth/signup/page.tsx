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
import { SignupFormData, signupSchema } from "../../../schema/signup";
import Link from "next/link";
import { commonStyle } from "@/lib/utils";

export default function SignupForm() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignupFormData>({
		resolver: zodResolver(signupSchema),
	});

	const onSubmit = async (data: SignupFormData) => {
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
		<div className="bg-background container px-3 h-screen flex justify-center items-center">
			<Card className="w-full max-w-md shadow-lg">
				<CardHeader className={`w-full`}>
					<CardTitle
						className={`w-full h-auto grid grid-cols-1 gap-2 place-content-center place-items-center`}
					>
						<NodgeLogo />
						<h3>Create a new account</h3>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-4"
					>
						{/* Username Field */}
						<div>
							<Label htmlFor="username">Username</Label>
							<Input
								id="username"
								type="text"
								placeholder="Enter your username"
								{...register("username")}
								className="mt-1"
							/>
							{errors.username && (
								<p className="text-red-600 text-sm mt-1">
									{errors.username.message}
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

						{/* Password Field */}
						<div>
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								placeholder="Enter your password"
								{...register("password")}
								className="mt-1"
							/>
							{errors.password && (
								<p className="text-red-600 text-sm mt-1">
									{errors.password.message}
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
								placeholder="Confirm your password"
								{...register("confirmPassword")}
								className="mt-1"
							/>
							{errors.confirmPassword && (
								<p className="text-red-600 text-sm mt-1">
									{errors.confirmPassword.message}
								</p>
							)}
						</div>

						{/* Submit Button */}
						<Button
							type="submit"
							disabled={isSubmitting}
							className="w-full"
						>
							{isSubmitting ? "Signing up..." : "Sign Up"}
						</Button>
						<p
							className={`w-full text-sm mt-2 text-center flex justify-center items-center gap-2`}
						>
							Already have an account?{" "}
							<Link
								href={"/auth/login"}
								className={`text-primary ${commonStyle.gradientText}`}
							>
								Login
							</Link>
						</p>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
