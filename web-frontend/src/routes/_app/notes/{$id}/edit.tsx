import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import EditNotePage from "@/features/notes/page/EditNotePage";
import useNoteEditor from "@/features/notes/store/noteEditorStore";
import { useEffect } from "react";

export const Route = createFileRoute("/_app/notes/{$id}/edit")({
    component: RouteComponent,
});

function RouteComponent() {
    const { note } = useLoaderData({ from: "/_app/notes/{$id}" });
    const { setData } = useNoteEditor();

    useEffect(() => {
        setData({
            id: note.id,
            note: note.content,
            title: note.title,
            tags: note.tags.map((tag) => tag.id),
            isPublic: note.isPublic,
            expirationDate: note.expirationDate,
            friendEmails: note.sharedWith.map((user) => ({ id: user.id, text: user.email })),
        });
    }, [note.id]);

    return <EditNotePage note={note} />;
}
