"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TbPlus, TbX } from "react-icons/tb";
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

// Updated workflow schema to include sharedWith
const workflowSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z.string().optional(),
  category: z.string().optional(),
  tags: z.string().optional(),
  sharedWith: z.string().optional(),
  triggerType: z.enum(["manual", "scheduled", "webhook"]),
  cronInterval: z.number().min(1).optional(),
  cronUnit: z.enum(["minutes", "hours", "days", "weeks", "months"]).optional(),
  isDraft: z.boolean().default(false),
  isPublic: z.boolean().default(false),
});

type WorkflowFormData = z.infer<typeof workflowSchema>;

// Mock user data - in a real app, you would fetch this from an API
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

const mockUsers: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
  { id: "3", name: "Alex Johnson", email: "alex@example.com" },
  { id: "4", name: "Sarah Williams", email: "sarah@example.com" },
];

export default function WorkflowCreateButton() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tagsList, setTagsList] = useState<string[]>([]);
  const [showScheduler, setShowScheduler] = useState(true);
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [showUserResults, setShowUserResults] = useState(false);

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
      category: "",
      triggerType: "manual",
      cronInterval: 1,
      cronUnit: "hours",
      isDraft: false,
      isPublic: false,
    },
  });

  const triggerType = watch("triggerType");
  const cronInterval = watch("cronInterval");
  const cronUnit = watch("cronUnit");

  useEffect(() => {
    setShowScheduler(triggerType === "scheduled");
  }, [triggerType]);

  // Handle user search
  useEffect(() => {
    if (userSearchQuery.trim().length > 0) {
      // Filter users based on search query
      const results = mockUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(userSearchQuery.toLowerCase())
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
      setValue("tags", newTags.join(","));
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    const newTags = tagsList.filter((t) => t !== tag);
    setTagsList(newTags);
    setValue("tags", newTags.join(","));
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
        newUsers.map((u) => u.id).join(",")
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
      newUsers.map((u) => u.id).join(",")
    );
  };

  const getCronExpression = () => {
    if (!cronInterval || !cronUnit) return "";
    
    const interval = cronInterval || 1;
    const unit = cronUnit || "hours";
    
    switch (unit) {
      case "minutes":
        return `*/${interval} * * * *`;
      case "hours":
        return `0 */${interval} * * *`;
      case "days":
        return `0 0 */${interval} * *`;
      case "weeks":
        return `0 0 * * ${interval === 1 ? "0" : `*/${interval * 7}`}`;
      case "months":
        return `0 0 1 */${interval} *`;
      default:
        return "";
    }
  };

  const onSubmit = async (data: WorkflowFormData) => {
    try {
      // Convert simple scheduler to cron expression
      const cronSchedule = triggerType === "scheduled" ? getCronExpression() : "";
      
      // Initial nodes and edges for a new workflow
      const initialWorkflow = {
        ...data,
        nodes: JSON.stringify([]),
        edges: JSON.stringify([]),
        tags: tagsList,
        sharedWith: selectedUsers.map((user) => user.id),
        cronSchedule, // Add the generated cron expression
        version: 1,
        status: "PENDING",
      };

      console.log("Creating workflow:", initialWorkflow);
      
      // Here you would typically call your API service
      // const apiService = new ApiService("/workflows");
      // await apiService.create(initialWorkflow);
      
      toast({
        title: "Success",
        description: "Workflow created successfully!",
        variant: "success",
      });
      
      // Close the modal and reset the form
      setOpen(false);
      reset();
      setTagsList([]);
      setSelectedUsers([]);
    } catch (error: any) {
      console.error("Workflow creation error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create workflow",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={`${commonStyle.gradientBg} flex justify-center items-center`} variant="default" size={"icon"}>
          <TbPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Workflow</DialogTitle>
          <DialogDescription>
            Define your workflow details. You will be able to design the workflow nodes after creation.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter workflow name"
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name.message}</p>
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

          {/* Category Field */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              onValueChange={(value) => setValue("category", value)}
              defaultValue=""
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="data">Data Processing</SelectItem>
                <SelectItem value="notification">Notifications</SelectItem>
                <SelectItem value="integration">Integration</SelectItem>
                <SelectItem value="automation">Automation</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tags Field */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
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
                  <Badge key={tag} variant="secondary" className="text-xs">
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
                onChange={(e) => setUserSearchQuery(e.target.value)}
                placeholder="Search users by name or email"
                className="flex-1"
              />
              {showUserResults && searchResults.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-card border rounded-md shadow-lg max-h-60 overflow-auto">
                  {searchResults.map((user) => (
                    <div
                      key={user.id}
                      className="p-2 hover:bg-accent cursor-pointer flex items-center"
                      onClick={() => addUser(user)}
                    >
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
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
                    <span className="text-xs">{user.name}</span>
                    <button
                      type="button"
                      className="ml-1 text-xs hover:text-destructive"
                      onClick={() => removeUser(user.id)}
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
            <Label htmlFor="triggerType">Trigger Type <span className="text-red-500">*</span></Label>
            <Select
              onValueChange={(value: "manual" | "scheduled" | "webhook") => setValue("triggerType", value)}
              defaultValue="manual"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select trigger type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">Manual</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="webhook">Webhook</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Scheduler Field (conditionally rendered) */}
          {showScheduler && (
            <div className="space-y-2">
              <Label>Schedule Configuration</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  min="1"
                  {...register("cronInterval", { valueAsNumber: true })}
                  placeholder="Interval"
                  className="w-24"
                />
                <Select
                  onValueChange={(value: "minutes" | "hours" | "days" | "weeks" | "months") => 
                    setValue("cronUnit", value)
                  }
                  defaultValue="hours"
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minutes">Minutes</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="days">Days</SelectItem>
                    <SelectItem value="weeks">Weeks</SelectItem>
                    <SelectItem value="months">Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                <p>Will run every {cronInterval || 1} {cronUnit || "hours"}</p>
                {showScheduler && (
                  <p className="text-xs mt-1">
                    Cron expression: <code className=" px-1 rounded">{getCronExpression()}</code>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Toggle Options */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Save as Draft</h4>
                  <p className="text-sm text-gray-500">
                    Save this workflow as a draft for later editing
                  </p>
                </div>
                <Switch
                  id="isDraft"
                  onCheckedChange={(checked) => setValue("isDraft", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Make Public</h4>
                  <p className="text-sm text-gray-500">
                    Allow this workflow to be viewed by other users
                  </p>
                </div>
                <Switch
                  id="isPublic"
                  onCheckedChange={(checked) => setValue("isPublic", checked)}
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
              {isSubmitting ? "Creating..." : "Create Workflow"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}