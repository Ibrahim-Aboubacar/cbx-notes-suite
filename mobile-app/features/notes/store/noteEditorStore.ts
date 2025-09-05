// import type { TInputTag } from "@/components/ui/TagInput";
import { Helper } from "@/lib/Helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type TInputTag = { id: string, value: string }
type TNoteEditorStore = {
    id: TUuid | null;
    note: string;
    title: string;
    wordsCount: number;
    tags: string[];
    isPublic: boolean;
    expirationDate: string;
    friendEmails: TInputTag[];
    setFriendEmails: (emails: TInputTag[]) => void;
    setExpirationDate: (date: Date) => void;
    toggleIsPublic: (isPublic: TNoteEditorStore["isPublic"]) => void;
    setNote: (note: TNoteEditorStore["note"]) => void;
    setTags: (tags: TNoteEditorStore["tags"] | ((prev: TNoteEditorStore["tags"]) => TNoteEditorStore["tags"])) => void;
    addTag: (tag: string) => void;
    setTitle: (title: TNoteEditorStore["title"]) => void;
    setData: (data: Pick<TNoteEditorStore, "note" | "title" | "tags" | "isPublic" | "expirationDate" | "friendEmails"> & { id?: TUuid }) => void;
    resetData: () => void;
};

const useNoteEditor = create(
    persist<TNoteEditorStore>(
        (set, get) => ({
            id: null,
            note: "",
            title: "",
            wordsCount: 0,
            tags: [],
            isPublic: false,
            expirationDate: new Date().toString(),
            friendEmails: [],
            setFriendEmails: (emails) => set({ friendEmails: emails }),
            setExpirationDate: (date) => set({ expirationDate: date.toString() }),
            toggleIsPublic: (isPublic) => set({ isPublic }),
            setNote: (note) => set({ note, wordsCount: Helper.wordCount(note) }),
            setTitle: (title) => set({ title }),
            setTags: (tags) => {
                if (typeof tags == "function") {
                    set({ tags: tags(get().tags) });
                } else {
                    set({ tags: tags });
                }
            },
            addTag: (tag) => {
                set({ tags: [...get().tags, tag] });
            },
            setData: (data) => set({ ...data, wordsCount: Helper.wordCount(data.note) }),
            resetData: () =>
                set({
                    id: null,
                    note: "",
                    title: "",
                    wordsCount: 0,
                    tags: [],
                    isPublic: false,
                    expirationDate: new Date().toString(),
                    friendEmails: [],
                }),
        }),
        {
            name: "note-editor",
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);

export const getNoteEditorStore = () => useNoteEditor.getState();

export default useNoteEditor;
