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

// Define form schema
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
	const [profile, setProfile] = useState<Profile | null>(null);
	const [avatarPreview, setAvatarPreview] = useState("");
	const [isUploading, setIsUploading] = useState(false);
	const router = useRouter();

	// Create the form with proper initialization
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

	// Fetch profile data
	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await apiService.get<
					CommonApiResponse<Profile>
				>("/get-profile");
				if (response.data) {
					setProfile(response.data);
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
				console.error("Error fetching profile:", error);
				toast({
					title: "Error",
					description: error.message || "Failed to load profile data",
					variant: "destructive",
				});
			} finally {
				setIsLoading(false);
			}
		};

		fetchProfile();
	}, [reset]);

	const onSubmit = async (data: ProfileFormValues) => {
		try {
			const response = await apiService.update<any, any>(
				"/update-profile",
				data
			);

			toast({
				title: "Success",
				description: response.message || "Profile updated successfully",
				variant: "default",
			});

			// Update local state with new data
			setProfile(response.data);
			if (response.data.avatar) {
				setAvatarPreview(response.data.avatar);
			}

			// Refresh the page to reflect changes
			router.refresh();
		} catch (error: any) {
			console.error("Error updating profile:", error);
			toast({
				title: "Error",
				description: error.message || "Failed to update profile",
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
							<span className="flex justify-center items-center gap-2">
								<BsPatchCheckFill
									className={`w-4 h-4 ${
										profile?.verified
											? "text-blue-500"
											: "text-yellow-500"
									}`}
								/>
								{profile?.verified ? "Verified" : "Pending"}
							</span>
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
										{...form.register("firstName")}
									/>
									{form.formState.errors.firstName && (
										<p className="text-sm text-red-500">
											{
												form.formState.errors.firstName
													.message
											}
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
										{...form.register("lastName")}
									/>
									{form.formState.errors.lastName && (
										<p className="text-sm text-red-500">
											{
												form.formState.errors.lastName
													.message
											}
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
										{...form.register("phoneNumber")}
									/>
									{form.formState.errors.phoneNumber && (
										<p className="text-sm text-red-500">
											{
												form.formState.errors
													.phoneNumber.message
											}
										</p>
									)}
								</div>

								{/* Trigger Type Field */}
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
										defaultValue={profile?.gender || "MALE"}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select trigger type" />
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
									{...form.register("avatar")}
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
									) : (
										"Save Changes"
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
