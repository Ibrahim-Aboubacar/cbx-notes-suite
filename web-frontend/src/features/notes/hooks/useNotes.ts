import { useCallback, useMemo } from "react"
import useGetNote from "../query/getNoteQuery"
import useNotesStore from "../store/noteStore"


export default function useNotes(type: TNoteType, searchQery?: object) {
    const { data, isLoading, ...getNoteProps } = useGetNote({ type, searchQery })
    const { myNotes, setNotes, publicNotes, setPublicNotes, sharedWithMeNotes, setSharedWithMeNotes } = useNotesStore()

    const notes: TNote[] = useMemo(() => {
        if (isLoading || !data) return getRequestedNotes(type)
        switch (type) {
            case 'public':
                setPublicNotes(data)
                break;
            case 'sharedWithMe':
                setSharedWithMeNotes(data)
                break;
            default:
                setNotes(data)
                break;
        }
        return getRequestedNotes(type)
    }, [data, isLoading])

    const getRequestedNotes = useCallback((type: TNoteType) => {
        switch (type) {
            case 'public':
                return publicNotes;
                break;
            case 'sharedWithMe':
                return sharedWithMeNotes
                break;
            default:
                return myNotes
                break;
        }
    }, [])

    return { notes, ...getNoteProps }
}
