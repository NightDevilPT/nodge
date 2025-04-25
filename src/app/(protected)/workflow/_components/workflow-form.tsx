"use client";

import { z } from "zod";
import { TbX } from "react-icons/tb";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { commonStyle } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import ApiService from "@/services/api.service";
import {
	CreateWorkflowRequest,
	WorkflowResponse,
} from "@/interface/workflow.interface";

// Define the TriggerType enum to match the Prisma model
const TriggerType = {
	MANUAL: "MANUAL",
	SCHEDULED: "SCHEDULED",
	WEBHOOK: "WEBHOOK",
} as const;

// Updated workflow schema to match the Prisma model
const workflowSchema = z.object({
	name: z.string().min(3, { message: "Name must be at least 3 characters" }),
	description: z.string().optional().default(""),
	tags: z.array(z.string()).default([]),
	sharedWith: z.array(z.string()).default([]),
	triggerType: z.enum(["MANUAL", "SCHEDULED", "WEBHOOK"]).default("MANUAL"),
	cronSchedule: z.string().optional(),
	isDraft: z.boolean().default(false),
	isPublic: z.boolean().default(false),
	nodes: z.any().default([]),
	edges: z.any().default([]),
});

type WorkflowFormData = z.infer<typeof workflowSchema>;

interface User {
	id: string;
	name: string;
	email: string;
	avatar?: string;
}

interface WorkflowFormProps {
	mode?: "create" | "edit";
	workflow?: WorkflowResponse;
	onSuccess?: () => void;
	children?: React.ReactNode;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const mockUsers: User[] = [
	{ id: "1", name: "John Doe", email: "john@example.com" },
	{ id: "2", name: "Jane Smith", email: "jane@example.com" },
	{ id: "3", name: "Alex Johnson", email: "alex@example.com" },
	{ id: "4", name: "Sarah Williams", email: "sarah@example.com" },
];

export default function WorkflowForm({
	mode = "create",
	workflow,
	onSuccess,
	children,
	open,
	setOpen,
}: WorkflowFormProps) {
  console.log(workflow, "workflow");
	const apiService = new ApiService("/workflow");
	const { toast } = useToast();
	// const [open, setOpen] = useState(false);
	const [tagInput, setTagInput] = useState("");
	const [tagsList, setTagsList] = useState<string[]>([]);
	const [showScheduler, setShowScheduler] = useState(false);
	const [userSearchQuery, setUserSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState<User[]>([]);
	const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
	const [showUserResults, setShowUserResults] = useState(false);
	const [cronInterval, setCronInterval] = useState(1);
	const [cronUnit, setCronUnit] = useState<
		"minutes" | "hours" | "days" | "weeks" | "months"
	>("hours");

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<WorkflowFormData>({
		resolver: zodResolver(workflowSchema),
		defaultValues: {
			name: "",
			description: "",
			triggerType: "MANUAL",
			isDraft: false,
			isPublic: false,
			tags: [],
			sharedWith: [],
			nodes: [],
			edges: [],
		},
	});

	const triggerType = watch("triggerType");

	// Initialize form with workflow data when in edit mode
	useEffect(() => {
		if (workflow) {
			setValue("name", workflow.name);
			setValue("description", workflow.description || "");
			setValue("triggerType", workflow.triggerType || ("MANUAL" as any));
			setValue("isDraft", workflow.isDraft);
			setValue("isPublic", workflow.isPublic);
			setValue("nodes", workflow.nodes || []);
			setValue("edges", workflow.edges || []);

			// Set tags
			if (workflow.tags) {
				setTagsList(workflow.tags);
				setValue("tags", workflow.tags);
			}

			// Set shared users (mock implementation - in real app you'd fetch actual users)
			if (workflow.sharedWith) {
				const users = mockUsers.filter((user) =>
					workflow.sharedWith?.includes(user.id)
				);
				setSelectedUsers(users);
				setValue("sharedWith", workflow.sharedWith);
			}

			// Parse cron schedule if exists
			if (workflow.triggerType === "SCHEDULED" && workflow.cronSchedule) {
				const cronParts = workflow.cronSchedule.split(" ");
				if (cronParts[0].startsWith("*/")) {
					const interval = parseInt(cronParts[0].substring(2));
					setCronInterval(interval);

					if (cronParts[1] === "*") {
						setCronUnit("hours");
					} else if (cronParts[2] === "*") {
						setCronUnit("days");
					} else if (cronParts[3] === "*") {
						setCronUnit("months");
					} else if (cronParts[4] === "*") {
						setCronUnit("weeks");
					}
				}
			}
		}
	}, [workflow, mode, setValue]);

	useEffect(() => {
		setShowScheduler(triggerType === "SCHEDULED");
	}, [triggerType]);

	useEffect(() => {
		if (userSearchQuery.trim().length > 0) {
			const results = mockUsers.filter(
				(user) =>
					user.name
						.toLowerCase()
						.includes(userSearchQuery.toLowerCase()) ||
					user.email
						.toLowerCase()
						.includes(userSearchQuery.toLowerCase())
			);
			setSearchResults(results);
			setShowUserResults(true);
		} else {
			setSearchResults([]);
			setShowUserResults(false);
		}
	}, [userSearchQuery]);

	const addTag = () => {
		if (tagInput.trim() && !tagsList.includes(tagInput.trim())) {
			const newTags = [...tagsList, tagInput.trim()];
			setTagsList(newTags);
			setValue("tags", newTags);
			setTagInput("");
		}
	};

	const removeTag = (tag: string) => {
		const newTags = tagsList.filter((t) => t !== tag);
		setTagsList(newTags);
		setValue("tags", newTags);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			addTag();
		}
	};

	const addUser = (user: User) => {
		if (!selectedUsers.some((u) => u.id === user.id)) {
			const newUsers = [...selectedUsers, user];
			setSelectedUsers(newUsers);
			setValue(
				"sharedWith",
				newUsers.map((u) => u.id)
			);
		}
		setUserSearchQuery("");
		setShowUserResults(false);
	};

	const removeUser = (userId: string) => {
		const newUsers = selectedUsers.filter((user) => user.id !== userId);
		setSelectedUsers(newUsers);
		setValue(
			"sharedWith",
			newUsers.map((u) => u.id)
		);
	};

	const getCronExpression = () => {
		if (!cronInterval) return "";

		switch (cronUnit) {
			case "minutes":
				return `*/${cronInterval} * * * *`;
			case "hours":
				return `0 */${cronInterval} * * *`;
			case "days":
				return `0 0 */${cronInterval} * *`;
			case "weeks":
				return `0 0 * * ${
					cronInterval === 1 ? "0" : `*/${cronInterval * 7}`
				}`;
			case "months":
				return `0 0 1 */${cronInterval} *`;
			default:
				return "";
		}
	};

	const onSubmit = async (data: WorkflowFormData) => {
		try {
			const cronExpression =
				triggerType === "SCHEDULED" ? getCronExpression() : undefined;

			const workflowData: CreateWorkflowRequest = {
				...data,
				cronSchedule: cronExpression,
				nodes: data.nodes || [],
				edges: data.edges || [],
        tags: data.tags || [],
        sharedWith: data.sharedWith || [],
        triggerType: data.triggerType,
        isDraft: data.isDraft,
        isPublic: data.isPublic,
			};

      console.log(workflowData, "workflowData");

			let response;
			if (workflow) {
				response = await apiService.update<WorkflowResponse, CreateWorkflowRequest>(
					`update-workflow/${workflow.id}`,
					workflowData
				);
			} else {
				response = await apiService.create<WorkflowResponse, CreateWorkflowRequest>(
          'create',
					workflowData
				);
			}

			toast({
				title: "Success",
				description: `Workflow ${
					mode === "edit" ? "updated" : "created"
				} successfully!`,
				variant: "success",
			});

			setOpen(false);
			reset();
			setTagsList([]);
			setSelectedUsers([]);

			if (onSuccess) {
				onSuccess();
			}
		} catch (error: any) {
			console.error(`Workflow ${mode} error:`, error);
			toast({
				title: "Error",
				description:
					error.message ||
					`Failed to ${
						mode === "edit" ? "update" : "create"
					} workflow`,
				variant: "destructive",
			});
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{/* {mode === "create" ? (
        <DialogTrigger asChild>
          <Button
            className={`${commonStyle.gradientBg} flex justify-center items-center`}
            variant="default"
            size={"icon"}
          >
            <TbPlus />
          </Button>
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          {children || (
            <Button
              className={`w-8 h-8 p-1 ${commonStyle.gradientBg}`}
              variant="default"
              onClick={() => setOpen(true)}
            >
              <TbEdit />
            </Button>
          )}
        </DialogTrigger>
      )} */}
			<DialogContent className="px-1 py-8">
				<ScrollArea className="sm:max-w-[600px] max-h-[80vh] px-5">
					<DialogHeader>
						<DialogTitle>
							{mode === "edit"
								? "Edit Workflow"
								: "Create New Workflow"}
						</DialogTitle>
						<DialogDescription>
							{workflow
								? "Update your workflow details."
								: "Define your workflow details. You will be able to design the workflow nodes after creation."}
						</DialogDescription>
					</DialogHeader>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-4 py-4"
					>
						{/* Name Field */}
						<div className="space-y-2">
							<Label htmlFor="name">
								Name <span className="text-red-500">*</span>
							</Label>
							<Input
								id="name"
								{...register("name")}
								placeholder="Enter workflow name"
							/>
							{errors.name && (
								<p className="text-red-600 text-sm">
									{errors.name.message}
								</p>
							)}
						</div>

						{/* Description Field */}
						<div className="space-y-2">
							<Label htmlFor="description">Description</Label>
							<Textarea
								id="description"
								{...register("description")}
								placeholder="Describe the purpose of this workflow"
								rows={3}
							/>
						</div>

						{/* Tags Field */}
						<div className="space-y-2">
							<Label htmlFor="tags">Tags</Label>
							<div className="flex">
								<Input
									id="tagInput"
									value={tagInput}
									onChange={(e) =>
										setTagInput(e.target.value)
									}
									onKeyDown={handleKeyDown}
									placeholder="Add tags and press Enter"
									className="flex-1"
								/>
								<Button
									type="button"
									variant="secondary"
									onClick={addTag}
									className="ml-2"
								>
									Add
								</Button>
							</div>
							{tagsList.length > 0 && (
								<div className="flex flex-wrap gap-2 mt-2">
									{tagsList.map((tag) => (
										<Badge
											key={tag}
											variant="secondary"
											className="text-xs"
										>
											{tag}
											<button
												type="button"
												className="ml-1 text-xs"
												onClick={() => removeTag(tag)}
											>
												×
											</button>
										</Badge>
									))}
								</div>
							)}
						</div>

						{/* Shared With Field */}
						<div className="space-y-2">
							<Label htmlFor="sharedWith">Share With Users</Label>
							<div className="relative">
								<Input
									id="userSearch"
									value={userSearchQuery}
									onChange={(e) =>
										setUserSearchQuery(e.target.value)
									}
									placeholder="Search users by name or email"
									className="flex-1"
								/>
								{showUserResults &&
									searchResults.length > 0 && (
										<div className="absolute z-10 w-full mt-1 bg-card border rounded-md shadow-lg max-h-60 overflow-auto">
											{searchResults.map((user) => (
												<div
													key={user.id}
													className="p-2 hover:bg-accent cursor-pointer flex items-center"
													onClick={() =>
														addUser(user)
													}
												>
													<Avatar className="h-8 w-8 mr-2">
														<AvatarFallback className="bg-primary text-primary-foreground">
															{user.name
																.split(" ")
																.map(
																	(n) => n[0]
																)
																.join("")}
														</AvatarFallback>
													</Avatar>
													<div>
														<p className="font-medium">
															{user.name}
														</p>
														<p className="text-xs text-gray-500">
															{user.email}
														</p>
													</div>
												</div>
											))}
										</div>
									)}
							</div>
							{selectedUsers.length > 0 && (
								<div className="flex flex-wrap gap-2 mt-2">
									{selectedUsers.map((user) => (
										<Badge
											key={user.id}
											variant="outline"
											className="flex items-center gap-1 p-1 pr-2"
										>
											<Avatar className="h-5 w-5">
												<AvatarFallback className="text-xs bg-primary text-primary-foreground">
													{user.name
														.split(" ")
														.map((n) => n[0])
														.join("")}
												</AvatarFallback>
											</Avatar>
											<span className="text-xs">
												{user.name}
											</span>
											<button
												type="button"
												className="ml-1 text-xs hover:text-destructive"
												onClick={() =>
													removeUser(user.id)
												}
											>
												<TbX size={14} />
											</button>
										</Badge>
									))}
								</div>
							)}
						</div>

						{/* Trigger Type Field */}
						<div className="space-y-2">
							<Label htmlFor="triggerType">
								Trigger Type{" "}
								<span className="text-red-500">*</span>
							</Label>
							<Select
								onValueChange={(
									value: "MANUAL" | "SCHEDULED" | "WEBHOOK"
								) => setValue("triggerType", value)}
								defaultValue={workflow?.triggerType || "MANUAL"}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select trigger type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="MANUAL">
										Manual
									</SelectItem>
									<SelectItem value="SCHEDULED">
										Scheduled
									</SelectItem>
									<SelectItem value="WEBHOOK">
										Webhook
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* Scheduler Field */}
						{showScheduler && (
							<div className="space-y-2">
								<Label>Schedule Configuration</Label>
								<div className="flex gap-2">
									<Input
										type="number"
										min="1"
										value={cronInterval}
										onChange={(e) =>
											setCronInterval(
												parseInt(e.target.value) || 1
											)
										}
										placeholder="Interval"
										className="w-24"
									/>
									<Select
										onValueChange={(
											value:
												| "minutes"
												| "hours"
												| "days"
												| "weeks"
												| "months"
										) => setCronUnit(value)}
										defaultValue={cronUnit}
									>
										<SelectTrigger className="flex-1">
											<SelectValue placeholder="Select unit" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="minutes">
												Minutes
											</SelectItem>
											<SelectItem value="hours">
												Hours
											</SelectItem>
											<SelectItem value="days">
												Days
											</SelectItem>
											<SelectItem value="weeks">
												Weeks
											</SelectItem>
											<SelectItem value="months">
												Months
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="text-sm text-gray-500 mt-1">
									<p>
										Will run every {cronInterval || 1}{" "}
										{cronUnit || "hours"}
									</p>
									<p className="text-xs mt-1">
										Cron expression:{" "}
										<code className="px-1 rounded">
											{getCronExpression()}
										</code>
									</p>
								</div>
							</div>
						)}

						{/* Toggle Options */}
						<Card>
							<CardContent className="p-4 space-y-4">
								<div className="flex items-center justify-between">
									<div>
										<h4 className="font-medium">
											Save as Draft
										</h4>
										<p className="text-sm text-gray-500">
											Save this workflow as a draft for
											later editing
										</p>
									</div>
									<Switch
										id="isDraft"
										defaultChecked={
											workflow?.isDraft || false
										}
										onCheckedChange={(checked) =>
											setValue("isDraft", checked)
										}
									/>
								</div>

								<div className="flex items-center justify-between">
									<div>
										<h4 className="font-medium">
											Make Public
										</h4>
										<p className="text-sm text-gray-500">
											Allow this workflow to be viewed by
											other users
										</p>
									</div>
									<Switch
										id="isPublic"
										defaultChecked={
											workflow?.isPublic || false
										}
										onCheckedChange={(checked) =>
											setValue("isPublic", checked)
										}
									/>
								</div>
							</CardContent>
						</Card>

						<DialogFooter>
							<Button
								type="button"
								variant="outline"
								onClick={() => {
									reset();
									setTagsList([]);
									setSelectedUsers([]);
									setOpen(false);
								}}
							>
								Cancel
							</Button>
							<Button
								type="submit"
								disabled={isSubmitting}
								className={`${commonStyle.gradientBg}`}
							>
								{isSubmitting
									? workflow
										? "Updating..."
										: "Creating..."
									: workflow
									? "Update Workflow"
									: "Create Workflow"}
							</Button>
						</DialogFooter>
					</form>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
