import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { UseQueryOptions } from "@tanstack/react-query";
import { NoteService } from "@/features/notes/services/noteService";


type ResponseType = Awaited<ReturnType<typeof NoteService.getTags>>;

export default function useGetTags(options?: Partial<UseQueryOptions<any, AxiosError, ResponseType>>) {
    return useQuery({
        queryKey: ["tags", "get"],
        queryFn: async () => {
            try {
                const res = await NoteService.getTags();

                return res;
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw error.response?.data;
                }
                throw error; // handel the error to tanstak query
            }
        },
        staleTime: 60 * 60 * 1000,
        gcTime: 60 * 60 * 1000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        ...options,
    });
}
