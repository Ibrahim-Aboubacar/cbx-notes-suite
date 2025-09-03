import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";



type TNotesStore = {
    myNotes: TNote[];
    publicNotes: TNote[];
    sharedWithMeNotes: TNote[];
    setNotes: (newNotes: TNotesStore['myNotes']) => void
    addNote: (note: TNote) => void
    getNoteById: (id: string) => TNote | null
    updateNoteById: (id: string, note: TNote) => void
    setPublicNotes: (notes: TNotesStore['publicNotes']) => void
    setSharedWithMeNotes: (notes: TNotesStore['sharedWithMeNotes']) => void
    setData: (data: Omit<TNotesStore, "setData" | "resetData" | "setNotes" | "addNote" | "setPublicNotes" | "setSharedWithMeNotes">) => void;
    resetData: () => void;
};

const useNotesStore = create(
    persist<TNotesStore>(
        (set, get) => ({
            myNotes: [],
            publicNotes: [],
            sharedWithMeNotes: [],
            setNotes: (notes) => set({ myNotes: notes }),
            addNote: (note) => set({ myNotes: [...get().myNotes, note] }),
            getNoteById: (id) => {
                const note = get().myNotes.find(note => note.id == id)
                return note || null
            },
            updateNoteById: (id, note) => {
                const notes = get().myNotes.map(myNote => myNote.id == id ? note : myNote)
                set({ myNotes: notes })
            },
            setPublicNotes: (notes) => set({ publicNotes: notes }),
            setSharedWithMeNotes: (notes) => set({ sharedWithMeNotes: notes }),
            setData: (data) => set(data),
            resetData: () => set({ myNotes: [], publicNotes: [], sharedWithMeNotes: [] }),
        }),
        {
            name: "notes",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);

export const getNotesStore = () => useNotesStore.getState();

export default useNotesStore;
