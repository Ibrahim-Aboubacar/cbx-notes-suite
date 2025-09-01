import type { TApiResponse } from "@/integrations/axios/axios";
import api from "@/integrations/axios/axios";
import { Helper } from "@/lib/Helpers";

type TAuthServiceResponse = {
    TLogin: {
        accessToken: string;
    }
    TRegister: {
        accessToken: string;
        user: any
    }
};

export const AuthService = {
    /**
     * Login user
     * @param email User email
     * @param password User password
     * @returns Promise<TApiResponse<TAuthServiceResponse['TLogin']>>
     * @throws Error if the request fails
     * @example
     * ```typescript
     * const res = await AuthService.login("email@example.com", "password");
     * ```
     */
    login: async (email: string, password: string) => {
        await Helper.sleep(2000);
        return await api
            .post<TApiResponse<TAuthServiceResponse["TLogin"]>>("api/v1/auth/login", { email, password })
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
     * Register user
     * @param username User username
     * @param email User email
     * @param password User password
     * @returns Promise<TApiResponse<TAuthServiceResponse['TRegister']>>
     * @throws Error if the request fails
     * @example
     * ```typescript
     * const res = await AuthService.register("user.name", "email@example.com", "password");
     * ```
     */
    register: async (username: string, email: string, password: string) => {
        await Helper.sleep(2000);
        return await api
            .post<TApiResponse<TAuthServiceResponse["TRegister"]>>("api/v1/auth/register", { username, email, password })
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
