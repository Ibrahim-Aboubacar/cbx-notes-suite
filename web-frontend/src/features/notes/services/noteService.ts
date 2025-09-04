import type { TApiResponse } from "@/integrations/axios/axios";
import api from "@/integrations/axios/axios";

type TNoteServiceResponse = {
    Tsave: {
        id: TUuid;
    };
    TGet: {
        notes: TBasicNote[]
    }
    TGetNote: {
        note: TDetailedNote
    }
    TGetTags: { tags: TTag[] }
};

export type TSaveNoteRequest = {
    title: string,
    content: string,
    isPublic: boolean,
    expirationDate: string,
    sharedWith: string[],
    tags: TUuid[]
}


export const NoteService = {
    /**
     * Save note
     * @param note Note to save
     * @returns Promise<TNoteServiceResponse['Tsave']>
     * @throws Error if the request fails
     * @example
     * ```typescript
     * const res = await NoteService.save({ title: "Note title", content: "# Note content", tags: ["tag1", "tag2"], sharedWith: ["user1@gmail.com", "user2@gmail.com"] });
     * ```
     */
    save: async (note: TSaveNoteRequest) => {
        return await api
            .post<TNoteServiceResponse["Tsave"]>("api/v1/notes", { ...note, expirationDate: new Date(note.expirationDate).toISOString() })
            .then((res) => {
                if (res.status === 200) {
                    return res.data;
                }
                throw new Error(res.status.toString());
            })
            .catch((err) => {
                throw err;
            });
    },

    /**
     * Get one note
     * @param noteId Note id
     * @returns Promise<TNoteServiceResponse['TGetNote']>
     * @throws Error if the request fails
     * @example
     * ```typescript
     * const res = await NoteService.getNote("xxx-xxxx");
     * ```
     */
    getNote: async ({ noteId }: { noteId: TUuid }) => {
        return await api
            .get<TNoteServiceResponse["TGetNote"]>("api/v1/notes/" + noteId)
            .then((res) => {
                if (res.status === 200) {
                    return res.data;
                }
                throw new Error(res.status.toString());
            })
            .catch((err) => {
                throw err;
            });
    },

    /**
     * Update note
     * @param noteId Note id
     * @param note Note to save
     * @returns Promise<TNoteServiceResponse['Tsave']>
     * @throws Error if the request fails
     * @example
     * ```typescript
     * const res = await NoteService.update("xxx-xxxx", { title: "Note title", content: "# Note content", tags: ["tag1", "tag2"], sharedWith: ["user1@gmail.com", "user2@gmail.com"] });
     * ```
     */
    update: async (noteId: TUuid, note: TSaveNoteRequest) => {
        return await api
            .put<TNoteServiceResponse["Tsave"]>("api/v1/notes/" + noteId, { ...note, expirationDate: new Date(note.expirationDate).toISOString() })
            .then((res) => {
                if (res.status === 200) {
                    return res.data;
                }
                throw new Error(res.status.toString());
            })
            .catch((err) => {
                throw err;
            });
    },

    /**
     * Delete note
     * @param noteId Note id
     * @returns Promise<TNoteServiceResponse['Tsave']>
     * @throws Error if the request fails
     * @example
     * ```typescript
     * const res = await NoteService.delete("xxx-xxxx");
     * ```
     */
    delete: async (noteId: TUuid) => {
        return await api
            .delete<TNoteServiceResponse["Tsave"]>("api/v1/notes/" + noteId)
            .then((res) => {
                if (res.status === 200) {
                    return res.data;
                }
                throw new Error(res.status.toString());
            })
            .catch((err) => {
                throw err;
            });
    },

    /**
     * Get my notes
     * @param searchQuery Search query params
     * @returns Promise<TApiResponse<TNoteServiceResponse['TGet']>>
     * @throws Error if the request fails
     * @example
     * ```typescript
     * const res = await NoteService.getMyNotes({ tag : 'lecture' });
     * ```
     */
    getMyNotes: async (searchQuery?: Object) => {
        return await api
            .get<TNoteServiceResponse["TGet"]>("api/v1/notes", { params: searchQuery })
            .then((res) => {
                if (res.status === 200) {
                    return res.data;
                }
                throw new Error(res.status.toString());
            })
            .catch((err) => {
                throw err;
            });
    },

    /**
     * Get public notes
     * @param searchQuery Search query params
     * @returns Promise<TNoteServiceResponse['TGet']>
     * @throws Error if the request fails
     * @example
     * ```typescript
     * const res = await NoteService.getPublicNotes({ tag : 'lecture' });
     * ```
     */
    getPublicNotes: async (searchQuery?: Object) => {
        return await api
            .get<TNoteServiceResponse["TGet"]>("api/v1/notes/public", { params: searchQuery })
            .then((res) => {
                if (res.status === 200) {
                    return res.data;
                }
                throw new Error(res.status.toString());
            })
            .catch((err) => {
                throw err;
            });
    },

    /**
     * Get notes shared with me
     * @param searchQuery Search query params
     * @returns Promise<TNoteServiceResponse['TGet']>
     * @throws Error if the request fails
     * @example
     * ```typescript
     * const res = await NoteService.getNotesSharedWithMe({ tag : 'lecture' });
     * ```
     */
    getNotesSharedWithMe: async (searchQuery?: Object) => {
        return await api
            .get<TNoteServiceResponse["TGet"]>("api/v1/notes/shared-with-me", { params: searchQuery })
            .then((res) => {
                if (res.status === 200) {
                    return res.data;
                }
                throw new Error(res.status.toString());
            })
            .catch((err) => {
                throw err;
            });
    },

    getTags: async () => {
        return await api
            .get<TNoteServiceResponse["TGetTags"]>("api/v1/tags")
            .then((res) => {
                if (res.status === 200) {
                    return res.data;
                }
                throw new Error(res.status.toString());
            })
            .catch((err) => {
                throw err;
            });
    },
};
