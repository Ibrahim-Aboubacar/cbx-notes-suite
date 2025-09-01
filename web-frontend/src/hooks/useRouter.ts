import { useRouter as useTanStackRouterUseRouter } from "@tanstack/react-router";

export default function useRouter() {
    const router = useTanStackRouterUseRouter();

    const handleBack = () => {
        if (window.history.length > 1) {
            window.history.back()
        } else {
            router.navigate({ to: '/' })
        }
    }

    const canGoBack = () => {
        return window.history.length > 1
    }
    return { ...router, back: handleBack, canGoBack };
}
