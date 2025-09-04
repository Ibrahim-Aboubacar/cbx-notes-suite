import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { UseQueryOptions } from "@tanstack/react-query";
import { NoteService } from "@/features/notes/services/noteService";

type ResponseType = Awaited<ReturnType<typeof NoteService.getMyNotes>>;

type RequestType = {
    type: TNoteType
    searchQery?: object
};

export default function useGetNotesQuery(payload?: RequestType, options?: Partial<UseQueryOptions<any, AxiosError, ResponseType>>) {
    return useQuery({
        queryKey: ["notes", "get", { ...payload }],
        queryFn: async () => {
            try {
                let res: { notes: TBasicNote[] };
                // save the note in the database
                switch (payload?.type) {
                    case 'public':
                        res = await NoteService.getPublicNotes(payload?.searchQery);
                        break;
                    case 'sharedWithMe':
                        res = await NoteService.getNotesSharedWithMe(payload?.searchQery);
                        break;
                    default:
                        res = await NoteService.getMyNotes(payload?.searchQery);
                        break;
                }

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
