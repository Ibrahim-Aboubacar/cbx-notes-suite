import LoginPage from "@/features/auth/login/page/LoginPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/login")({
    component: LoginPage,
});
