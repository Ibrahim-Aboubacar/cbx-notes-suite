import { cn } from "@/lib/utils";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import logo from "@/assets/images/logo.png";

export const Route = createFileRoute("/_auth")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className={cn("min-h-screen gap-4 grid place-content-center px-4")}>
            <div className="flex items-center space-x-2 mx-auto">
                <img src={logo} className="size-8" />
                <span className="font-bold text-xl text-teal-600">CoNote</span>
            </div>
            <Outlet />
        </div>
    );
}
