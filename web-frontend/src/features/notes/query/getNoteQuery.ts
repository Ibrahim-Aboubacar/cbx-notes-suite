import { useSuspenseQuery, type UseSuspenseQueryOptions } from '@tanstack/react-query';
import { NoteService } from '../services/noteService';

export default function useNoteQuery({ noteId }: { noteId: TUuid }) {
    return useSuspenseQuery(getNoteQueryOptions({ noteId }));
}

export type TGetNoteQueryOptions = Awaited<ReturnType<typeof NoteService.getNote>>

export const getNoteQueryOptions = ({ noteId }: { noteId: TUuid }): UseSuspenseQueryOptions<TGetNoteQueryOptions> => {
    return {
        queryKey: ["note", noteId],
        queryFn: async () => {
            return await NoteService.getNote({ noteId });
        },
        gcTime: 1_000 * 60 * 60 * 24, // 1 day
        staleTime: 1_000 * 60 * 60 * 24, // 1 day
        refetchOnMount: false,
        refetchOnWindowFocus: true
    }
}