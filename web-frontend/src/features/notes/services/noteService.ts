import type { TApiResponse } from "@/integrations/axios/axios";
import api from "@/integrations/axios/axios";
import { Helper } from "@/lib/Helpers";

type TNoteServiceResponse = {
    Tsave: {
        id: string;
    };
    TGet: TNote[]
    TGetTags: { tags: TTag[] }
};


export const NoteService = {
    /**
     * Save note
     * @param note Note to save
     * @returns Promise<TApiResponse<TNoteServiceResponse['TGet']>>
     * @throws Error if the request fails
     * @example
     * ```typescript
     * const res = await NoteService.save({ title: "Note title", content: "# Note content", tags: ["tag1", "tag2"], sharedWith: ["user1@gmail.com", "user2@gmail.com"] });
     * ```
     */
    save: async (note: Omit<TNote, "id">) => {
        await Helper.sleep(1_000);
        return await api
            .post<TApiResponse<TNoteServiceResponse["Tsave"]>>("api/v1/auth/notes", { ...note })
            .then((res) => {
                if (res.data.status === 200) {
                    return res.data.data;
                }
                throw new Error(res.data.message);
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
        await Helper.sleep(1_000);
        return await api
            .get<TApiResponse<TNoteServiceResponse["TGet"]>>("api/v1/auth/notes", { params: searchQuery })
            .then((res) => {
                if (res.data.status === 200) {
                    return res.data.data;
                }
                throw new Error(res.data.message);
            })
            .catch((err) => {
                throw err;
            });
    },

    /**
     * Get public notes
     * @param searchQuery Search query params
     * @returns Promise<TApiResponse<TNoteServiceResponse['TGet']>>
     * @throws Error if the request fails
     * @example
     * ```typescript
     * const res = await NoteService.getPublicNotes({ tag : 'lecture' });
     * ```
     */
    getPublicNotes: async (searchQuery?: Object) => {
        await Helper.sleep(1_000);
        return await api
            .get<TApiResponse<TNoteServiceResponse["TGet"]>>("api/v1/auth/notes/public", { params: searchQuery })
            .then((res) => {
                if (res.data.status === 200) {
                    return res.data.data;
                }
                throw new Error(res.data.message);
            })
            .catch((err) => {
                throw err;
            });
    },

    /**
     * Get notes shared with me
     * @param searchQuery Search query params
     * @returns Promise<TApiResponse<TNoteServiceResponse['TGet']>>
     * @throws Error if the request fails
     * @example
     * ```typescript
     * const res = await NoteService.getNotesSharedWithMe({ tag : 'lecture' });
     * ```
     */
    getNotesSharedWithMe: async (searchQuery?: Object) => {
        await Helper.sleep(1_000);
        return await api
            .get<TApiResponse<TNoteServiceResponse["TGet"]>>("api/v1/auth/notes/shared-with-me", { params: searchQuery })
            .then((res) => {
                if (res.data.status === 200) {
                    return res.data.data;
                }
                throw new Error(res.data.message);
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
    }
};
