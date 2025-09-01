import axios from "axios";
import type { AxiosError, AxiosResponse } from "axios";
import { env } from "@/env";
import { version } from "@/../package.json";
import { Helper } from "@/lib/Helpers";
import { getOtpTokenStore } from "@/features/auth/store/otpTokenStore";

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
        "x-co-note-web-app": "true",
        "x-co-note-web-app-version": version,
        "x-co-note-web-app-env": env.environment,
    },
});

/**
 * Hook the interceptors
 */
api.interceptors.response.use(responseInterceptor, errorInterceptor);

api.interceptors.request.use((config) => {
    const token = getOtpTokenStore().token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
/**
 * Response interceptor
 */
async function responseInterceptor(response: AxiosResponse) {
    await Helper.sleep(Helper.rand(1000, 2000));
    return response;
}

/**
 * Error interceptor
 */
async function errorInterceptor(error: AxiosError) {
    // await Helper.sleep(rand(800, 2000))
    if (!window.navigator.onLine) {
        // toast.error('Connexion Internet perdue.', {
        //     description: 'Veuillez vérifier votre réseau.'
        // })
        // TODO: make a component to show the online status message
        // useOnlineStatusStore.setState({ online: false })
        console.error("No Internet Connection");
    }

    return Promise.reject(error);
}

export type TApiResponse<T = null> = {
    status: number;
    message: string;
    data: T;
    timestamp: string;
};

export default api;
