import { Outlet } from "@tanstack/react-router";
import { PendingComponent } from "@/components/layout/PendingComponent";
import { getNoteQueryOptions, type TGetNoteQueryOptions } from "@/features/notes/query/getNoteQuery";
import { createFileRoute, notFound } from "@tanstack/react-router";
import NoteNotFoundComponent from "@/features/notes/components/NoteNotFoundComponent";

export const Route = createFileRoute("/_app/notes/{$id}")({
    // middelware to ensure that we fetch the note before rendering
    loader: async ({ context, params: { id: noteId } }) => {
        const { queryClient } = context;
        try {
            // read last data before fetching
            let res = queryClient.getQueryData<TGetNoteQueryOptions>(["note", noteId]);

            if (!res?.note) {
                res = await queryClient.fetchQuery(getNoteQueryOptions({ noteId }));
            }
            if (!res.note) {
                throw notFound();
            } else {
                return {
                    note: res.note,
                };
            }
        } catch (error) {
            throw notFound();
        }
    },
    component: RouteComponent,
    pendingComponent: PendingComponent,
    notFoundComponent: NoteNotFoundComponent,
});

function RouteComponent() {
    return <Outlet />;
}
