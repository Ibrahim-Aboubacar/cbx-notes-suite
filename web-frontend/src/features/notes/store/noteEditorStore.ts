import type { TInputTag } from "@/components/ui/TagInput";
import { Helper } from "@/lib/Helpers";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type TNoteEditorStore = {
    note: string;
    title: string;
    wordsCount: number;
    tags: string[];
    isNoteVisible: boolean;
    expirationDate: string;
    friendEmails: TInputTag[],
    setFriendEmails: (emails: TInputTag[]) => void,
    setExpirationDate: (date: Date) => void;
    toggleNoteVisible: (visibility: TNoteEditorStore["isNoteVisible"]) => void;
    setNote: (note: TNoteEditorStore["note"]) => void;
    setTags: (tags: TNoteEditorStore["tags"] | ((prev: TNoteEditorStore["tags"]) => TNoteEditorStore["tags"])) => void;
    setTitle: (title: TNoteEditorStore["title"]) => void;
    setData: (data: Omit<TNoteEditorStore, "setData" | "resetData" | "setNote" | "setTitle" | "wordsCount">) => void;
    resetData: () => void;
};

const useNoteEditor = create(
    persist<TNoteEditorStore>(
        (set, get) => ({
            note: "",
            title: "",
            wordsCount: 0,
            tags: [],
            isNoteVisible: false,
            expirationDate: (new Date().toString()),
            friendEmails: [],
            setFriendEmails: (emails) => set({ friendEmails: emails }),
            setExpirationDate: (date) => set({ expirationDate: date.toString() }),
            toggleNoteVisible: (visibility) => set({ isNoteVisible: visibility }),
            setNote: (note) => set({ note, wordsCount: Helper.wordCount(note) }),
            setTitle: (title) => set({ title }),
            setTags: (tags) => {
                if (typeof tags == "function") {
                    set({ tags: tags(get().tags) });
                } else {
                    set({ tags: tags });
                }
            },
            setData: (data) => set(data),
            resetData: () => set({ note: "", title: "", wordsCount: 0 }),
        }),
        {
            name: "note-editor",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
export const getNoteEditorStore = () => useNoteEditor.getState();

export default useNoteEditor;
