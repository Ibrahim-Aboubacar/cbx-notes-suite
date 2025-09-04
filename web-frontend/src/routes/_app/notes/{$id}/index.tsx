import NoteDetailsPage from "@/features/notes/page/NoteDetailsPage";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/notes/{$id}/")({
    // // middelware to ensure that we fetch the note before rendering
    // loader: async ({ context, params: { id: noteId } }) => {
    //     const { queryClient } = context;
    //     // read last data before fetching
    //     let res = queryClient.getQueryData<TGetNoteQueryOptions>(["note", noteId]);

    //     if (!res?.note) {
    //         res = await queryClient.fetchQuery(getNoteQueryOptions({ noteId }));
    //     }
    //     if (!res.note) {
    //         throw notFound();
    //     } else {
    //         return {
    //             note: res.note,
    //         };
    //     }
    // },
    component: RouteComponent,
    // pendingComponent: PendingComponent,
});

function RouteComponent() {
    const { note } = useLoaderData({ from: "/_app/notes/{$id}" });

    return <NoteDetailsPage note={note} />;
}
