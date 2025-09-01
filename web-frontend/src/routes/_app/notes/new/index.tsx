import { createFileRoute } from "@tanstack/react-router";
import CreateNotePage from "@/features/notes/page/CreateNotePage";

export const Route = createFileRoute("/_app/notes/new/")({
    component: CreateNotePage,
});
