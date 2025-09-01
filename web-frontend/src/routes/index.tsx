import LandingPage from "@/components/layout/LandingPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: LandingPage,
});
