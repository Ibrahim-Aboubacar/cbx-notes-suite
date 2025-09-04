import { useToggle } from 'react-use';
import useSaveNoteQuery from '../query/saveNoteQuery';
import useNoteEditor from '../store/noteEditorStore';
import { useQueryClient } from '@tanstack/react-query';
import { ToastService } from '@/services/toastService/toastService';
import { useNavigate } from '@tanstack/react-router';

export default function useSaveNote() {
    const queryClient = useQueryClient();
    const { note, isPublic, expirationDate, friendEmails, tags, title } = useNoteEditor();
    const [open, toggleOpen] = useToggle(false);
    const navigate = useNavigate()

    const [isPending, togglePending] = useToggle(false)
    const { mutateAsync } = useSaveNoteQuery();

    const handleSubmit = () => {
        togglePending(true)
        mutateAsync({
            note: {
                title: title,
                content: note,
                isPublic,
                expirationDate,
                sharedWith: friendEmails.map((email) => email.text),
                tags
            }
        })
            .then((response) => {
                // queryClient.setQueryData(["notes", "get", note.id], note)
                // prefetch the note to be able to navigate to it without waiting long
                queryClient.prefetchQuery({ queryKey: ["notes", "get", response.id] })

                setTimeout(() => {
                    ToastService.success({
                        title: "Note enregistrée",
                        description: "Votre note a été enregistrée avec succès",
                    })
                    queryClient.invalidateQueries({
                        queryKey: ["notes", "get"],
                        exact: false
                    })
                }, 300);
                toggleOpen(false)
                navigate({ to: `/notes/${response.id}`, replace: true })
            })
            .catch((err) => {
                ToastService.error({
                    title: "Oups!!!",
                    description: "Une erreur est survenue lors de l'enregistrement de la note",
                })
                console.log(err)
            })
            .finally(() => {
                togglePending(false)
            })
    }
    return { handleSubmit, isPending, open, toggleOpen };
}
