import { AuthService } from "@/features/auth/services/authService";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ResponseType = Awaited<ReturnType<typeof AuthService.login>>;

type RequestType = {
    email: string;
    password: string;
};

export default function useLogin(options?: UseMutationOptions<ResponseType, AxiosError, RequestType>) {
    return useMutation({
        mutationKey: ["auth", "login"],
        mutationFn: async ({ email, password }: RequestType) => {
            try {
                const res = await AuthService.login(email, password);
                return res;
            } catch (error) {
                throw error;
            }
        },
        ...options,
    });
}
