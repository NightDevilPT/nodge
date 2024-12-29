import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NodgeUserNav() {
	const handleLogout = () => {
		console.log("User logged out");
	};

	const menuItems = [
		{
			label: "Profile",
			shortcut: "⇧⌘P",
			onClick: () => console.log("Profile clicked"),
		},
		{
			label: "Billing",
			shortcut: "⌘B",
			onClick: () => console.log("Billing clicked"),
		},
		{
			label: "Settings",
			shortcut: "⌘S",
			onClick: () => console.log("Settings clicked"),
		},
		{
			label: "New Team",
			shortcut: null,
			onClick: () => console.log("New Team clicked"),
		},
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="relative h-8 w-8 rounded-full"
				>
					<Avatar className="h-8 w-8">
						<AvatarImage src="/avatars/01.png" alt="@shadcn" />
						<AvatarFallback>SC</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">
							NightDevil
						</p>
						<p className="text-xs leading-none text-muted-foreground">
							nightdevilpt@example.com
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					{menuItems.map((item, index) => (
						<DropdownMenuItem
							key={index}
							className="hover:bg-gradient-to-tr hover:from-primary hover:to-green-400 hover:!text-white hover:dark:!text-black cursor-pointer"
							onClick={item.onClick}
						>
							{item.label}
							{item.shortcut && (
								<DropdownMenuShortcut
									className={`hover:!text-white hover:dark:!text-black`}
								>
									{item.shortcut}
								</DropdownMenuShortcut>
							)}
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="hover:!bg-gradient-to-tr hover:!from-destructive hover:!to-red-400 hover:!text-white cursor-pointer"
					onClick={handleLogout}
				>
					Log out
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
