import { useToggle } from "react-use";
import { useQueryClient } from "@tanstack/react-query";
import { ToastService } from "@/services/toastService/toastService";
import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import useDeleteNoteQuery from "../query/deleteNoteQuery";
import useDleteNoteModalStore from "../store/deleteNoteModalStore";

export default function useDeleteNote() {
    const queryClient = useQueryClient();
    const { modalOpenToOpen, toggleModaltoOpen } = useDleteNoteModalStore();

    const navigate = useNavigate();

    const [isPending, togglePending] = useToggle(false);
    const { mutateAsync: deleteNote } = useDeleteNoteQuery();

    const handleSubmit = (noteId: string) => {
        togglePending(true);

        deleteNote({
            noteId,
        })
            .then(thenRes)
            .catch(catchError)
            .finally(() => {
                togglePending(false);
            });
    };

    const thenRes = useCallback(() => {
        // queryClient.setQueryData(["notes", "get", note.id], note)
        // prefetch the note to be able to navigate to it without waiting long
        queryClient.invalidateQueries({ queryKey: ["notes", "get"], exact: false });

        setTimeout(() => {
            ToastService.success({
                title: "Note supprimée",
                description: "Votre note a été supprimée avec succès",
            });
            queryClient.invalidateQueries({
                queryKey: ["notes", "get"],
                exact: false,
            });
        }, 300);
        toggleModaltoOpen("");
        navigate({ to: `/notes`, replace: true });
    }, [toggleModaltoOpen, navigate]);

    const catchError = useCallback((err: any) => {
        ToastService.error({
            title: "Oups!!!",
            description: "Une erreur est survenue lors de la suppression de la note",
        });
        console.error(err);
    }, []);
    return { handleSubmit, isPending, modalOpenToOpen, toggleModalToOpen: toggleModaltoOpen };
}
