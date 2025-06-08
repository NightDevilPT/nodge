import Link from "next/link";
import Image from "next/image";
import {
	TbEdit,
	TbEye,
	TbTrash,
	TbDotsVertical,
	TbPhoto,
} from "react-icons/tb";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { WorkflowResponse } from "@/interface/workflow.interface";

interface WorkflowCardProps extends WorkflowResponse {
	onView?: (id: string) => void;
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
}

export const WorkflowCard = ({
	id,
	name,
	banner,
	description,
	tags,
	triggerType,
	isDraft,
	isPublic,
	updatedAt,
	user,
	onView,
	onEdit,
	onDelete,
}: WorkflowCardProps) => {
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleString();
	};

	return (
		<Card className="hover:shadow-lg transition-shadow duration-200 p-0">
			<CardHeader className="px-4 py-0 pt-3 pb-1">
				<div className="flex w-full h-auto aspect-video relative justify-between items-start">
					{banner ? (
						<Image
							fill
							src={banner || ""}
							alt="lll"
							className="rounded-md border-[1px]"
						/>
					) : (
						<div className="w-full h-auto aspect-video flex justify-center items-center rounded-md border-[1px]">
							<TbPhoto className="w-10 h-10 text-accent" />
						</div>
					)}
					<div className="flex absolute right-1 top-1 items-center gap-2">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="sm"
									className="h-8 w-8 p-0"
								>
									<TbDotsVertical className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem onClick={() => onView?.(id)}>
									<TbEye className="mr-2 h-4 w-4" />
									<span>View</span>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => onEdit?.(id)}>
									<TbEdit className="mr-2 h-4 w-4" />
									<span>Edit</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									className="text-destructive focus:text-destructive"
									onClick={() => onDelete?.(id)}
								>
									<TbTrash className="mr-2 h-4 w-4" />
									<span>Delete</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</CardHeader>
			<Separator className="mt-2" />
			<CardContent className="p-0 px-4 py-2">
				<CardTitle className="text-lg line-clamp-1 p-0">
					<Link href={`/reactflow/${id}`}>{name}</Link>
				</CardTitle>
				<div className="flex justify-end items-center gap-2">
					<Badge
						variant={isDraft ? "secondary" : "default"}
						className={
							isDraft
								? "bg-yellow-100 text-yellow-800 hover:bg-yellow-300"
								: "bg-green-100 text-green-800 hover:bg-green-300"
						}
					>
						{isDraft ? "Draft" : "Active"}
					</Badge>
					<Badge
						variant={
							triggerType === "SCHEDULED"
								? "default"
								: "secondary"
						}
						className={
							triggerType === "SCHEDULED"
								? "bg-green-100 text-green-800 hover:bg-green-300"
								: "bg-purple-100 text-purple-800 hover:bg-purple-300"
						}
					>
						{triggerType || "MANUAL"}
					</Badge>

					<Badge
						variant={isPublic ? "default" : "secondary"}
						className={
							isPublic
								? "bg-yellow-100 text-yellow-800 hover:bg-yellow-300"
								: "bg-gray-100 text-gray-800 hover:bg-gray-300"
						}
					>
						{isPublic ? "Public" : "Private"}
					</Badge>
				</div>
				<div className="grid grid-cols-1 gap-1">
					<Label className=" text-xs text-muted-foreground">
						Description
					</Label>
					<p className="text-sm line-clamp-2 mb-3">
						{description || "No description"}
					</p>
				</div>

				<div className="flex flex-wrap gap-2 mb-3">
					<Label className="text-muted-foreground text-sm">
						Tags :{" "}
					</Label>
					{tags && tags.length > 0 ? (
						tags.map((tag, index) => (
							<Badge
								key={index}
								variant="outline"
								className="text-xs"
							>
								{tag}
							</Badge>
						))
					) : (
						<span className="text-gray-400 text-xs">No tags</span>
					)}
				</div>
			</CardContent>
			<Separator />
			<CardFooter className="p-0 px-4 py-2 grid grid-cols-2 place-content-between place-items-baseline">
				{user && (
					<Label className="text-sm text-muted-foreground w-full flex justify-start items-center truncate">
						Owner : {user.firstName} {user.lastName}
					</Label>
				)}
				<span className="text-sm text-muted-foreground w-full flex justify-end items-center truncate">
					Updated: {formatDate(updatedAt)}
				</span>
			</CardFooter>
		</Card>
	);
};
