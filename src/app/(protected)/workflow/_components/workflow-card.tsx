import { useState } from "react";
import { TbEdit, TbInfoCircle, TbTrash } from "react-icons/tb";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Custom Render Function for Cards (ShadCN)
export const WorkflowCard = (item: {
	id: string;
	name: string;
	email: string;
	role: string;
	status: string;
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleEdit = () => {
		alert(`Edit User ID: ${item.id}`);
	};

	const handleDelete = () => {
		alert(`Delete User ID: ${item.id}`);
	};

	return (
		<Card className="w-full p-4 shadow-md">
			<CardHeader className="p-0">
				<CardTitle className="flex justify-between items-center">
					{item.name}{" "}
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button className="w-7 h-7 p-0" variant={"ghost"}>
								<TbInfoCircle />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-[200px]" align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={handleEdit}>
								<TbEdit />
								<span>Edit</span>
								{/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
							</DropdownMenuItem>
							<DropdownMenuItem onClick={handleDelete}>
								<TbTrash />
								<span>Delete</span>
								{/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</CardTitle>
			</CardHeader>
			<CardContent className="p-0">
				<p className="text-sm text-gray-600">{item.email}</p>
				<p className="text-sm text-gray-500">{item.role}</p>
				<span
					className={`px-3 py-1 mt-2 rounded-full text-xs ${
						item.status === "Active"
							? "bg-green-200 text-green-800"
							: "bg-red-200 text-red-800"
					}`}
				>
					{item.status}
				</span>
			</CardContent>
		</Card>
	);
};
