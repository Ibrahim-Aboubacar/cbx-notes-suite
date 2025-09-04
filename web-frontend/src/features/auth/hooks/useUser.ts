import { useSuspenseQuery, type UseSuspenseQueryOptions } from "@tanstack/react-query";
import { AuthService } from "../services/authService";

export default function useUser() {
    return useSuspenseQuery(getUserQueryOpions());
}

export type TGetUserQuery =
    | {
        data: {
            user: TUser;
        };
        success: boolean;
        message: string;
    }
    | {
        data: null;
        success: boolean;
        message: string;
    };

export const getUserQueryOpions = (): UseSuspenseQueryOptions<TGetUserQuery> => {
    return {
        queryKey: ["user"],
        queryFn: async () => {
            return await AuthService.me();
        },
    }
}