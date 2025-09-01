import Header from "@/components/layout/Header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="flex h-screen flex-col">
            <Header />
            <div className=" flex-1 overflow-auto max-w-5xl w-full mx-auto">
                <Outlet />
            </div>
        </div>
    );
}
