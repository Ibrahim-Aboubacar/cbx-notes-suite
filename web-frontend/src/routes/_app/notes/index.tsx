import MyNotesPage from "@/features/notes/page/MyNotesPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/notes/")({
    component: MyNotesPage,
});
