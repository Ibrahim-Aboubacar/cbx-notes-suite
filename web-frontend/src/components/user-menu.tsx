import { ChevronsUpDown, LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function UserMenu() {
    const user = {
        username: "cisko.dev",
        email: "cisko.dev@gmail.com",
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 hover:bg-transparent flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-full">{user.username.charAt(0).toUpperCase()}</span>
                    <div className="flex flex-col gap-0.5 leading-none">
                        <span className="">{user.username}</span>
                    </div>
                    <ChevronsUpDown size={14} className="text-muted-foreground/80" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-64" align="end">
                <DropdownMenuLabel className="flex min-w-0 flex-col">
                    <span className="text-foreground truncate text-sm font-medium">{user.username}</span>
                    <span className="text-muted-foreground truncate text-xs font-normal">{user.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <PinIcon size={16} className="opacity-60" aria-hidden="true" />
                        <span>Option 4</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <UserPenIcon size={16} className="opacity-60" aria-hidden="true" />
                        <span>Option 5</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator /> */}
                <DropdownMenuItem variant="destructive">
                    <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
