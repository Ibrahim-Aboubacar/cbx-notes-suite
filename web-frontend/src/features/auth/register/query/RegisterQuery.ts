import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { UseMutationOptions } from "@tanstack/react-query";
import { AuthService } from "@/features/auth/services/authService";

type ResponseType = Awaited<ReturnType<typeof AuthService.login>>;

type RequestType = {
    username: string;
    email: string;
    password: string;
};

export default function useRegister(options?: UseMutationOptions<ResponseType, AxiosError, RequestType>) {
    return useMutation({
        mutationKey: ["auth", "register"],
        mutationFn: async ({ username, email, password }: RequestType) => {
            try {
                const res = await AuthService.register(username, email, password);
                return res;
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw error.response?.data;
                }
                throw error; // handel the error to tanstak query
            }
        },
        ...options,
    });
}
