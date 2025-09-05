import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { UseMutationOptions } from "@tanstack/react-query";
import { NoteService } from "@/features/notes/services/noteService";

type ResponseType = Awaited<ReturnType<typeof NoteService.delete>>;

type RequestType = {
    noteId: TUuid;
};

export default function useDeleteNoteQuery(options?: UseMutationOptions<ResponseType, AxiosError, RequestType>) {
    return useMutation({
        mutationKey: ["notes", "delete"],
        mutationFn: async ({ noteId }: RequestType) => {
            try {
                const res = await NoteService.delete(noteId);

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
