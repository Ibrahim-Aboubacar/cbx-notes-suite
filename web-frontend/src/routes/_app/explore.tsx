import { createFileRoute } from "@tanstack/react-router";
import PublicNotesPage from "@/features/notes/page/PublicNotesPage";

export const Route = createFileRoute("/_app/explore")({
    component: PublicNotesPage,
});
