import { ToastService } from "@/features/shared/services/toastService/toastService";
import { getRouteApi } from "@tanstack/react-router";
import { useRef } from "react";

const routeApi = getRouteApi("/_auth/login");

export default function useLoginHook() {
    // display error if sessionsExpired is true
    const search = routeApi.useSearch();
    const hasRunFirstTime = useRef(false);

    if (!hasRunFirstTime.current) {
        hasRunFirstTime.current = true;
        if (search.sessionsExpired) {
            setTimeout(() => {
                ToastService.error({
                    title: "Session Expired",
                    description: "Your session has expired. Please login again.",
                });
            }, 500);
        }
    }
}
