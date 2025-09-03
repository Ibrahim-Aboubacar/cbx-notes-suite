import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import TanStackQueryLayout from "../integrations/tanstack-query/layout.tsx";

import type { QueryClient } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { env } from "@/env.ts";
import NotFoundPage from "@/components/layout/NotFound.tsx";
import { PendingComponent } from "@/components/layout/PendingComponent.tsx";

interface MyRouterContext {
    queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: () => (
        <>
            <Toaster position="top-right" theme="light" richColors closeButton />
            <Outlet />
            {env.isDev && (
                <>
                    <TanStackRouterDevtools />
                    <TanStackQueryLayout />
                </>
            )}
        </>
    ),
    notFoundComponent: NotFoundPage,
    pendingComponent: PendingComponent,
});
