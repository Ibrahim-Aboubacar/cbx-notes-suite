import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { UseMutationOptions } from "@tanstack/react-query";
import { NoteService, type TSaveNoteRequest } from "@/features/notes/services/noteService";
// import useNotesStore from "../store/noteStore";
// import { Helper } from "@/lib/Helpers";

type ResponseType = Awaited<ReturnType<typeof NoteService.save>>;

type RequestType = {
    note: TSaveNoteRequest
};

export default function useSaveNoteQuery(options?: UseMutationOptions<ResponseType, AxiosError, RequestType>) {
    // const { addNote, updateNoteById } = useNotesStore();

    return useMutation({
        mutationKey: ["notes", "save"],
        mutationFn: async ({ note }: RequestType) => {
            try {
                // temporaly save the note in the store
                // const tempId = Helper.randomString(10)
                // addNote({ ...note, id: tempId })

                // save the note in the database
                const res = await NoteService.save(note);

                // update the id of the note in the store
                // updateNoteById(tempId, { ...note, id: res.id })

                return res;
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw error.response?.data;
                }
                throw error; // handel the error to tanstak query
            }
        },
        ...options,
    });
}
