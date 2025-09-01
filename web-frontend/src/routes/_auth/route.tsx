import { cn } from "@/lib/utils";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import AppLogo from "@/components/AppLogo";

export const Route = createFileRoute("/_auth")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className={cn("min-h-screen gap-4 grid place-content-center px-4")}>
            <div className="mx-auto">
                <AppLogo />
            </div>
            <Outlet />
        </div>
    );
}
