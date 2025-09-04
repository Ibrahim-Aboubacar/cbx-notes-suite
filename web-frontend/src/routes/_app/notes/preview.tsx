import PreviewPage from "@/features/notes/page/PreviewPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/notes/preview")({
    component: PreviewPage,
});
