import LandingPage from "@/components/layout/LandingPage";
import { PendingComponent } from "@/components/layout/PendingComponent";
import { getUserQueryOpions, type TGetUserQuery } from "@/features/auth/hooks/useUser";
import { getTokenStore } from "@/features/auth/store/tokenStore";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    // middelware to ensure that user is redirected to notes page if authenticated
    loader: async ({ context }) => {
        const { queryClient } = context;
        // read last data before fetching
        let res = queryClient.getQueryData<TGetUserQuery>(["user"]);

        if (!res?.success || !res?.data?.user) {
            res = await queryClient.fetchQuery(getUserQueryOpions());
        }

        if (res.success && res.data?.user) {
            const authStore = getTokenStore();

            authStore.setData({
                token: authStore.token,
                user: res.data.user,
            });
            throw redirect({
                to: "/notes",
                replace: true,
            });
        }
    },
    component: LandingPage,
    pendingComponent: PendingComponent,
});
