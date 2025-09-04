import { createFileRoute } from "@tanstack/react-router";
import SharedWithMeNotesPage from "@/features/notes/page/SharedWithMeNotesPage";

export const Route = createFileRoute("/_app/shared-with-me")({
    component: SharedWithMeNotesPage,
});
