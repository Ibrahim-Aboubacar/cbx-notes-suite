import { env } from "@/env";
import { getTokenStore } from "@/features/auth/store/tokenStore";
import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";
import { version } from "../../package.json";

const DOMAIN = env.api_url;

/**
 * Axios instance
 * @example
 * ```typescript
 * const res = await api.post<TApiResponse>("/api/endpoint", payload);
 * ```
 */
const api = axios.create({
    baseURL: DOMAIN,
    headers: {
        Accept: "application/json",
        "x-co-note-mobile-app": "true",
        "x-co-note-mobile-app-version": version,
    },
});

/**
 * Hook the interceptors
 */
api.interceptors.response.use(responseInterceptor, errorInterceptor);

api.interceptors.request.use((config) => {
    const token = getTokenStore().token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
/**
 * Response interceptor
 */
async function responseInterceptor(response: AxiosResponse) {
    return response;
}

/**
 * Error interceptor
 */
async function errorInterceptor(error: AxiosError) {
    // await Helper.sleep(rand(800, 2000))
    // if (!window.navigator.onLine) {
    //     // toast.error('Connexion Internet perdue.', {
    //     //     description: 'Veuillez vérifier votre réseau.'
    //     // })
    //     // TODO: make a component to show the online status message
    //     // useOnlineStatusStore.setState({ online: false })
    //     console.error("No Internet Connection");
    // }
    console.error(error.message, error);

    return Promise.reject(error);
}

export type TApiResponse<T = null> = {
    status: number;
    message: string;
    data: T;
    timestamp: string;
};

export default api;
