import Header from "@/components/layout/Header";
import { PendingComponent } from "@/components/layout/PendingComponent";
import { getUserQueryOpions } from "@/features/auth/hooks/useUser";
import { getOtpTokenStore } from "@/features/auth/store/otpTokenStore";
import { ToastService } from "@/services/toastService/toastService";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
    // middelware to ensure that user is authenticated
    loader: async ({ context }) => {
        const { queryClient } = context;
        const res = await queryClient.fetchQuery(getUserQueryOpions());
        if (!res.success || !res.data?.user) {
            setTimeout(() => {
                ToastService.error({
                    title: "Vous n'êtes pas connecté",
                    description: "Veuillez vous connecter!",
                });
            }, 200);
            throw redirect({
                to: "/login",
                replace: true,
            });
        } else {
            const authStore = getOtpTokenStore();

            authStore.setData({
                token: authStore.token,
                user: res.data.user,
            });
        }
    },
    component: RouteComponent,
    pendingComponent: PendingComponent,
});

function RouteComponent() {
    return (
        <div className="flex h-screen flex-col bg-gradient-to-t from-teal-50 to-teal-50/50">
            <Header />
            <div className=" flex-1 overflow-auto max-w-5xl w-full mx-auto">
                <Outlet />
            </div>
        </div>
    );
}
