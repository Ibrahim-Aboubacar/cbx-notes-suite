import { ChevronsUpDown, LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import useOtpTokenStore from "@/features/auth/store/otpTokenStore";
import { Helper } from "@/lib/Helpers";
import { useCallback } from "react";
import { AuthService } from "@/features/auth/services/authService";
import useRouter from "@/hooks/useRouter";

export default function UserMenu() {
    const router = useRouter();
    const { user: authUser } = useOtpTokenStore();
    const user: TUser = authUser
        ? authUser
        : {
              id: Helper.randomString(16),
              pseudo: "Guest",
              email: "guest@example.com",
          };

    const handleLogout = useCallback(() => {
        AuthService.logout();
        router.navigate({ to: "/login", replace: true });
    }, []);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 hover:bg-transparent flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-full">{user.pseudo.charAt(0).toUpperCase()}</span>
                    <div className="flex flex-col gap-0.5 leading-none">
                        <span className="">{user.pseudo}</span>
                    </div>
                    <ChevronsUpDown size={14} className="text-muted-foreground/80" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-64" align="end">
                <DropdownMenuLabel className="flex min-w-0 flex-col">
                    <span className="text-foreground truncate text-sm font-medium">{user.pseudo}</span>
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
                <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                    <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
