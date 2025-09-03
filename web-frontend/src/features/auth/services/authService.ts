import api from "@/integrations/axios/axios";
import { AxiosError } from "axios";
import { getOtpTokenStore } from "../store/otpTokenStore";

type TAuthServiceResponse = {
    TLogin: {
        accessToken: string;
        user: TUser
    };
    TRegister: {
        accessToken: string;
        user: TUser
    };
    TMe: {
        user: TUser
    };
};

export const AuthService = {
    /**
     * Login user
     * @param email User email
     * @param password User password
     * @returns Promise<TAuthServiceResponse['TLogin']>
     * @throws Error if the request fails
     * @example
     * ```typescript
     * const res = await AuthService.login("email@example.com", "password");
     * ```
     */
    login: async (email: string, password: string) => {
        return await api
            .post<TAuthServiceResponse["TLogin"]>("api/v1/auth/login", { email, password })
            .then((res) => {
                if (res.status === 200) {
                    return {
                        data: res.data,
                        success: true,
                        message: ""
                    }
                }
                throw new Error(res.status.toString());
            })
            .catch((err) => {
                if (err instanceof AxiosError) {
                    const { response } = err
                    if (response?.status === 403) {
                        return {
                            data: null,
                            success: false,
                            message: "Email ou mot de passe incorrect"
                        }
                    }
                }
                return {
                    data: null,
                    success: false,
                    message: "Veuillez vérifier vos identifiants"
                }
                throw err;
            });
    },

    /**
     * Register user
     * @param username User username
     * @param email User email
     * @param password User password
     * @returns Promise<TAuthServiceResponse['TRegister']>
     * @throws Error if the request fails
     * @example
     * ```typescript
     * const res = await AuthService.register("user.name", "email@example.com", "password");
     * ```
     */
    register: async (pseudo: string, email: string, password: string) => {
        return await api
            .post<TAuthServiceResponse["TRegister"]>("api/v1/auth/register", { pseudo, email, password })
            .then((res) => {
                if (res.status === 200) {
                    return {
                        data: res.data,
                        success: true,
                        message: ""
                    }
                }
                throw new Error(res.status.toString());
            })
            .catch((err) => {
                return {
                    data: null,
                    success: false,
                    message: "Veuillez vérifier vos identifiants"
                }
                throw err;
            });
    },
    /**
     * Get user
     * @returns Promise<TAuthServiceResponse['TMe']>
     * @throws Error if the request fails
     * @example
     * ```typescript
     * const res = await AuthService.me();
     * ```
     */
    me: async () => {
        return await api
            .get<TAuthServiceResponse["TMe"]>("api/v1/auth/me")
            .then((res) => {
                if (res.status === 200) {
                    return {
                        data: res.data,
                        success: true,
                        message: ""
                    }
                }
                throw new Error(res.status.toString());
            })
            .catch(() => {
                return {
                    data: null,
                    success: false,
                    message: "Vous n'êtes pas connecté!"
                }
            });
    },

    /**
     * Logout user
     * @returns void
     * @throws Error if the request fails
     * @example
     * ```typescript
     * await AuthService.logout();
     * ```
     */
    logout: async () => {
        const authStore = getOtpTokenStore();
        authStore.resetData()
    },
};
