import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { UseMutationOptions } from "@tanstack/react-query";
import { NoteService, type TSaveNoteRequest } from "@/features/notes/services/noteService";

type ResponseType = Awaited<ReturnType<typeof NoteService.update>>;

type RequestType = {
    noteId: TUuid;
    note: TSaveNoteRequest;
};

export default function useUpdateNoteQuery(options?: UseMutationOptions<ResponseType, AxiosError, RequestType>) {
    return useMutation({
        mutationKey: ["notes", "update"],
        mutationFn: async ({ note, noteId }: RequestType) => {
            try {
                const res = await NoteService.update(noteId, note);

                return res;
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw error.response?.data;
                }
                throw error;
            }
        },
        ...options,
    });
}
