"use client";

import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ApiService from "@/services/api.service";
import { Button } from "@/components/ui/button";
import { Profile } from "@/interface/profile.interface";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CommonApiResponse } from "@/interface/common.interface";
import { BannerUploader } from "@/components/shared/banner-uploader";
import ProfileSettingSkeleton from "@/components/shared/nodge-skeleton/profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const profileFormSchema = z.object({
	firstName: z.string().min(2, {
		message: "First name must be at least 2 characters.",
	}),
	lastName: z.string().min(2, {
		message: "Last name must be at least 2 characters.",
	}),
	phoneNumber: z.string().optional(),
	avatar: z.string().url().optional().or(z.literal("")),
	gender: z.enum(["MALE", "FEMALE", "OTHER"]),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileSetting() {
	const apiService = new ApiService("/profile");
	const [isLoading, setIsLoading] = useState(true);
	const [profileExists, setProfileExists] = useState(false);
	const [avatarPreview, setAvatarPreview] = useState("");
	const [isUploading, setIsUploading] = useState(false);
	const router = useRouter();

	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			phoneNumber: "",
			avatar: "",
			gender: "MALE",
		},
	});

	const { handleSubmit, reset, register, setValue, formState } = form;

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await apiService.get<
					CommonApiResponse<Profile>
				>("/get-profile");

				if (response.data) {
					setProfileExists(true);
					reset({
						firstName: response.data.firstName,
						lastName: response.data.lastName,
						phoneNumber: response.data.phoneNumber || "",
						avatar: response.data.avatar || "",
						gender: (response.data.gender || "MALE") as
							| "MALE"
							| "FEMALE"
							| "OTHER",
					});
					if (response.data.avatar) {
						setAvatarPreview(response.data.avatar);
					}
				}
			} catch (error: any) {
				// If profile doesn't exist, we'll create it
				if (error.response?.status === 404) {
					setProfileExists(false);
				} else {
					console.error("Error fetching profile:", error);
					toast({
						title: "Error",
						description:
							error.message || "Failed to load profile data",
						variant: "destructive",
					});
				}
			} finally {
				setIsLoading(false);
			}
		};

		fetchProfile();
	}, [reset]);

	const onSubmit = async (data: ProfileFormValues) => {
		try {
			let response;

			if (profileExists) {
				// Update existing profile
				response = await apiService.update<
					CommonApiResponse<Profile>,
					ProfileFormValues
				>("/update-profile", data);
			} else {
				// Create new profile
				response = await apiService.create<
					CommonApiResponse<Profile>,
					ProfileFormValues
				>("/create", data);
				setProfileExists(true);
			}

			toast({
				title: "Success",
				description: response.message || "Profile saved successfully",
				variant: "success",
			});

			// Update avatar preview if changed
			if (data.avatar) {
				setAvatarPreview(data.avatar);
			}

			// Refresh the page to reflect changes
			router.refresh();
		} catch (error: any) {
			console.error("Error saving profile:", error);
			toast({
				title: "Error",
				description: error.message || "Failed to save profile",
				variant: "destructive",
			});
		}
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-full w-full">
				<ProfileSettingSkeleton />
			</div>
		);
	}

	return (
		<ScrollArea className="h-full">
			<div className="container mx-auto py-4">
				<Card className="w-full bg-transparent mx-auto">
					<CardHeader>
						<CardTitle className="flex justify-between items-center">
							Profile Settings
							{profileExists && (
								<span className="flex justify-center items-center gap-2">
									<BsPatchCheckFill
										className={`w-4 h-4 text-blue-500`}
									/>
									Profile Created
								</span>
							)}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-6 w-full"
						>
							<div className="w-full h-auto flex justify-center items-center">
								<BannerUploader
									title="Profile Avatar"
									value={avatarPreview}
									className="max-w-[50%] max-xl:max-w-[80%] max-lg:max-w-full"
									onChange={(value) => {
										setAvatarPreview(value);
										setValue("avatar", value, {
											shouldDirty: true,
										});
									}}
									isUploading={isUploading}
									setIsUploading={setIsUploading}
									aspectRatio={"video"}
								/>
							</div>

							<Separator className="my-6" />

							<div className="grid grid-cols-2 max-lg:grid-cols-1 gap-6">
								<div className="space-y-2">
									<Label
										htmlFor="firstName"
										className="text-sm font-medium"
									>
										First Name
									</Label>
									<Input
										id="firstName"
										placeholder="John"
										{...register("firstName")}
									/>
									{formState.errors.firstName && (
										<p className="text-sm text-red-500">
											{formState.errors.firstName.message}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label
										htmlFor="lastName"
										className="text-sm font-medium"
									>
										Last Name
									</Label>
									<Input
										id="lastName"
										placeholder="Doe"
										{...register("lastName")}
									/>
									{formState.errors.lastName && (
										<p className="text-sm text-red-500">
											{formState.errors.lastName.message}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label
										htmlFor="phoneNumber"
										className="text-sm font-medium"
									>
										Phone Number
									</Label>
									<Input
										id="phoneNumber"
										placeholder="+1 (555) 123-4567"
										{...register("phoneNumber")}
									/>
									{formState.errors.phoneNumber && (
										<p className="text-sm text-red-500">
											{
												formState.errors.phoneNumber
													.message
											}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="gender">
										Gender{" "}
										<span className="text-red-500">*</span>
									</Label>
									<Select
										onValueChange={(
											value: "MALE" | "FEMALE" | "OTHER"
										) =>
											setValue("gender", value, {
												shouldDirty: true,
											})
										}
										defaultValue={
											form.getValues("gender") || "MALE"
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select gender" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="MALE">
												Male
											</SelectItem>
											<SelectItem value="FEMALE">
												Female
											</SelectItem>
											<SelectItem value="OTHER">
												Other
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<input
									type="hidden"
									id="avatar"
									{...register("avatar")}
								/>
							</div>

							<div className="flex justify-end gap-4 pt-4">
								<Button
									type="button"
									variant="outline"
									onClick={() => form.reset()}
									disabled={!formState.isDirty}
								>
									Cancel
								</Button>
								<Button
									type="submit"
									disabled={
										!formState.isDirty ||
										formState.isSubmitting
									}
								>
									{formState.isSubmitting ? (
										<Loader2 className="h-4 w-4 animate-spin" />
									) : profileExists ? (
										"Update Profile"
									) : (
										"Create Profile"
									)}
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</ScrollArea>
	);
}
