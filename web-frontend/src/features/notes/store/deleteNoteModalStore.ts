import { create } from "zustand";

type TNoteEditorStore = {
    modalOpenToOpen: TUuid;
    toggleModaltoOpen: (isModalOpen: TNoteEditorStore["modalOpenToOpen"]) => void;
};

const useDleteNoteModalStore = create<TNoteEditorStore>(
    (set) => ({
        modalOpenToOpen: '',
        toggleModaltoOpen: (isModalOpen) => set({ modalOpenToOpen: isModalOpen }),
    }),
);

export const getDeleteNoteModalStore = () => useDleteNoteModalStore.getState();

export default useDleteNoteModalStore;
