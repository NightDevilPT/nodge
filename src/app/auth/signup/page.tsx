"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import { commonStyle } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ApiService from "@/services/api.service";
import { Button } from "@/components/ui/button";
import NodgeLogo from "@/components/shared/logo";
import { CreateUserRequest, User } from "@/interface/user.interface";
import { SignupFormData, signupSchema } from "../../../schema/signup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignupForm() {
	const router = useRouter();
	const { toast } = useToast();
	const apiService = new ApiService("/user/register");
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignupFormData>({
		resolver: zodResolver(signupSchema),
	});

	const onSubmit = async (data: SignupFormData) => {
		try {
			const newUser: CreateUserRequest = {
				email: data.email,
				password: data.password,
				provider: "CREDENTIAL",
				username: data.username,
			};
			// Call the ApiService create method to register the user
			const saveUser = await apiService.create<
				{ message: string },
				CreateUserRequest
			>(newUser);
			toast({
				title: "Success",
				description: saveUser.message,
				variant: "success",
			});
			router.push("/auth/verify");
		} catch (error: any) {
			console.error("Signup error:", error);
			alert(
				error.response?.data?.message || "An unexpected error occurred."
			);
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
						<h3>Create new account</h3>
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
