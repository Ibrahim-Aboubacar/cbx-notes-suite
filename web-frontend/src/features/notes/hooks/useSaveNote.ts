import { useToggle } from 'react-use';
import useSaveNoteQuery from '../query/saveNoteQuery';
import useNoteEditor from '../store/noteEditorStore';
import { useQueryClient } from '@tanstack/react-query';
import { ToastService } from '@/services/toastService/toastService';
import { useNavigate } from '@tanstack/react-router';
import useUpdateNoteQuery from '../query/updateNoteQuery';
import { useCallback } from 'react';

export default function useSaveNote({ isEdit }: { isEdit: boolean }) {
    const queryClient = useQueryClient();
    const { id, note: content, isPublic, expirationDate, friendEmails, tags, title } = useNoteEditor();
    const [open, toggleOpen] = useToggle(false);
    const navigate = useNavigate()

    const [isPending, togglePending] = useToggle(false)
    const { mutateAsync: createNote } = useSaveNoteQuery();
    const { mutateAsync: updateNote } = useUpdateNoteQuery();


    const handleSubmit = () => {
        togglePending(true)

        const note = {
            title: title,
            content,
            isPublic,
            expirationDate,
            sharedWith: friendEmails.map((email) => email.text),
            tags
        }
        if (isEdit) {
            if (!id) {
                ToastService.error({
                    title: "Une erreur est survenue!",
                    description: "Veuillez rafrechir la page puis reessaiyer!"
                })
                togglePending(true)
                return
            }
            updateNote({
                noteId: id,
                note
            })
                .then(thenRes)
                .catch(catchError)
                .finally(() => {
                    togglePending(false)
                });
        } else {
            createNote({
                note
            })
                .then(thenRes)
                .catch(catchError)
                .finally(() => {
                    togglePending(false)
                });
        }
    }

    const thenRes = useCallback(async (response: { id: string }) => {
        // queryClient.setQueryData(["notes", "get", note.id], note)
        // prefetch the note to be able to navigate to it without waiting long
        queryClient.invalidateQueries({ queryKey: ["note", response.id], exact: false })
        queryClient.invalidateQueries({ queryKey: ["notes", "get"], exact: false })
        await queryClient.refetchQueries({ queryKey: ["note", response.id], exact: false })

        setTimeout(() => {
            ToastService.success({
                title: "Note enregistrée",
                description: "Votre note a été enregistrée avec succès",
            })
            queryClient.refetchQueries({
                queryKey: ["notes", "get"],
                exact: false
            })
        }, 300);
        toggleOpen(false)
        navigate({ to: `/notes/${response.id}`, replace: true })
    }, [toggleOpen, navigate])

    const catchError = useCallback((err: any) => {
        ToastService.error({
            title: "Oups!!!",
            description: "Une erreur est survenue lors de l'enregistrement de la note",
        })
        console.error(err)
    }, [])
    return { handleSubmit, isPending, open, toggleOpen };
}
