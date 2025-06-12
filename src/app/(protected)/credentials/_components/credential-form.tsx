"use client";

import * as z from "zod";
import React from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ApiService from "@/services/api.service";
import {
	CredentialType,
	CREDENTIAL_TYPES,
} from "@/interface/credential.interface";
import { AwsCredentialForm } from "./credentials-form/aws";
import { SlackCredentialForm } from "./credentials-form/slack";
import { SecurityUtils } from "@/lib/security-utils";

const credentialSchema = z.object({
	credentialType: z.string(),
	credentialsValue: z.record(z.any()),
});

interface CredentialFormProps {
	mode?: "create" | "edit";
	credential?: any;
	onSuccess?: () => void;
	children?: React.ReactNode;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	userId?: string;
}

export default function CredentialForm({
	mode = "create",
	credential,
	onSuccess,
	children,
	open,
	setOpen,
	userId,
}: CredentialFormProps) {
	const apiService = new ApiService("/credential");
	const { toast } = useToast();
	const [isSubmitting, setIsSubmitting] = React.useState(false);

	const form = useForm<z.infer<typeof credentialSchema>>({
		resolver: zodResolver(credentialSchema),
		defaultValues: {
			credentialType: "",
			credentialsValue: {},
		},
	});

	const selectedType = form.watch("credentialType");
	const credentialConfig = selectedType
		? CREDENTIAL_TYPES[selectedType]
		: null;

	// Reset form when dialog opens/closes or credential changes
	React.useEffect(() => {
		if (open) {
			if (mode === "edit" && credential) {
				form.reset({
					credentialType: credential.credentialType,
					credentialsValue:
						SecurityUtils.decryptSecureCredentialValue(
							credential.credentialsValue
						) || {},
				});
			} else {
				// Reset to empty form for create mode
				form.reset({
					credentialType: "",
					credentialsValue: {},
				});
			}
		}
	}, [open, form]);

	const onSubmit = async (values: z.infer<typeof credentialSchema>) => {
		try {
			setIsSubmitting(true);
			const secureValue = SecurityUtils.createSecureCredentialValue(
				values.credentialsValue
			);

			if (mode === "edit" && credential) {
				await apiService.update(`update-credentials/${credential.id}`, {
					...values,
					credentialsValue: secureValue,
				});
				toast({
					title: "Success",
					description: "Credential updated successfully",
				});
			} else {
				await apiService.create("create", {
					...values,
					credentialsValue: secureValue,
					userId,
				});
				toast({
					title: "Success",
					description: "Credential created successfully",
				});
			}
			setOpen(false);
			onSuccess?.();
		} catch (error) {
			toast({
				title: "Error",
				description: "Something went wrong. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="px-1 py-8">
				<ScrollArea className="sm:max-w-[600px] max-h-[80vh] px-5">
					<DialogHeader>
						<DialogTitle>
							{mode === "edit"
								? "Edit Credential"
								: "Create New Credential"}
						</DialogTitle>
						<DialogDescription>
							{credential
								? "Update your credential details. All data is encrypted for security."
								: "Add a new credential to use in your workflows. All data will be encrypted for security."}
						</DialogDescription>
					</DialogHeader>

					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6"
						>
							<FormField
								control={form.control}
								name="credentialType"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Credential Type</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
											disabled={mode === "edit"}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select credential type" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{Object.values(
													CredentialType
												).map((type) => (
													<SelectItem
														key={type}
														value={type}
													>
														{type}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							{credentialConfig && (
								<div className="space-y-4">
									{selectedType === CredentialType.AWS && (
										<AwsCredentialForm
											form={form}
											fields={credentialConfig.fields}
											isSubmitting={isSubmitting}
										/>
									)}
									{selectedType === CredentialType.SLACK && (
										<SlackCredentialForm
											form={form}
											fields={credentialConfig.fields}
											isSubmitting={isSubmitting}
										/>
									)}
								</div>
							)}

							<DialogFooter>
								<Button
									type="submit"
									disabled={isSubmitting}
									className="w-full"
								>
									{isSubmitting && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									{mode === "edit" ? "Update" : "Create"}
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}