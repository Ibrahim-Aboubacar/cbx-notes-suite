import type { TApiResponse } from "@/integrations/axios/axios";
import api from "@/integrations/axios/axios";

type TAuthServiceResponse = {
    TLogin: {
        otpToken: string;
    }
};

export const AuthService = {
    /**
     * Login user
     * @param username User email
     * @param password User password
     * @returns Promise<TApiResponse<TAuthServiceResponse['TLogin']>>
     * @throws Error if the request fails
     * @example
     * ```typescript
     * const res = await AuthService.login("username", "password");
     * ```
     */
    login: async (username: string, password: string) => {
        // await sleep(2000);
        return await api
            .post<TApiResponse<TAuthServiceResponse["TLogin"]>>("/auth/login", { username, password })
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

    // logout: async () => api.post("/auth/logout"),

    // getProfile: async () => api.get("/auth/me").then(res => res.data),
};
