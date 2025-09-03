import { useSuspenseQuery, type UseSuspenseQueryOptions } from "@tanstack/react-query";
import { AuthService } from "../services/authService";

export default function useUser() {
    return useSuspenseQuery(getUserQueryOpions());
}


export const getUserQueryOpions = (): UseSuspenseQueryOptions<Awaited<ReturnType<typeof AuthService.me>>> => {
    return {
        queryKey: ["user"],
        queryFn: async () => {
            return await AuthService.me();
        },
    }
}