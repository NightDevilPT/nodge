import {
	TbEdit,
	TbTrash,
	TbDotsVertical,
	TbKey,
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
import { CREDENTIAL_TYPES, CredentialType } from "@/interface/credential.interface";

interface CredentialCardProps {
	id: string;
	credentialType: CredentialType;
	credentialsValue: Record<string, any>;
	updatedAt: string;
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
}

export const CredentialCard = ({
	id,
	credentialType,
	credentialsValue,
	updatedAt,
	onEdit,
	onDelete,
}: CredentialCardProps) => {
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleString();
	};

	const Icon = CREDENTIAL_TYPES[credentialType]?.defaultIcon || TbKey;

	return (
		<Card className="hover:shadow-lg transition-shadow duration-200 p-0">
			<CardHeader className="px-4 py-0 pt-3 pb-1">
				<div className="flex w-full h-auto aspect-video relative justify-between items-start">
					<div className="w-full h-auto aspect-video flex justify-center items-center rounded-md border-[1px] bg-muted/50">
						<Icon className="w-10 h-10 text-muted-foreground" />
					</div>
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
					{credentialType}
				</CardTitle>
				<div className="flex justify-end items-center gap-2">
					<Badge
						variant="secondary"
						className="bg-blue-100 text-blue-800 hover:bg-blue-300"
					>
						{credentialType}
					</Badge>
				</div>

				<div className="flex flex-wrap gap-2 mb-3">
					<Label className="text-muted-foreground text-sm">
						Keys :{" "}
					</Label>
					{Object.keys(credentialsValue).length > 0 ? (
						Object.keys(credentialsValue).map((key, index) => (
							<Badge
								key={index}
								variant="outline"
								className="text-xs"
							>
								{key}
							</Badge>
						))
					) : (
						<span className="text-gray-400 text-xs">No keys</span>
					)}
				</div>
			</CardContent>
			<Separator />
			<CardFooter className="p-0 px-4 py-2">
				<span className="text-sm text-muted-foreground w-full flex justify-end items-center truncate">
					Updated: {formatDate(updatedAt)}
				</span>
			</CardFooter>
		</Card>
	);
}; 