import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { UseMutationOptions } from "@tanstack/react-query";
import { NoteService, type TSaveNoteRequest } from "@/features/notes/services/noteService";

type ResponseType = Awaited<ReturnType<typeof NoteService.save>>;

type RequestType = {
    note: TSaveNoteRequest;
};

export default function useSaveNoteQuery(options?: UseMutationOptions<ResponseType, AxiosError, RequestType>) {
    return useMutation({
        mutationKey: ["notes", "save"],
        mutationFn: async ({ note }: RequestType) => {
            try {
                const res = await NoteService.save(note);

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
