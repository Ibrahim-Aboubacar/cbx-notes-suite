import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type TOtpTokenStore = {
    token: string | null;
    user: TUser | null;
    setData: (data: Omit<TOtpTokenStore, "setData" | "resetData">) => void;
    resetData: () => void;
};

const useOtpTokenStore = create(
    persist<TOtpTokenStore>(
        (set) => ({
            token: null,
            user: null,
            setData: (data) => set(data),
            resetData: () => set({ token: null, user: null }),
        }),
        {
            name: "token",
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);
export const getOtpTokenStore = () => useOtpTokenStore.getState();

export default useOtpTokenStore;
