import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type TOtpTokenStore = {
    token: string | null;
    username: string | null;
    expireAt: Date | null;
    setData: (data: { token: TOtpTokenStore["token"]; username: TOtpTokenStore["username"]; expireAt: TOtpTokenStore["expireAt"] }) => void;
    resetData: () => void;
};

const useOtpTokenStore = create(
    persist<TOtpTokenStore>(
        (set) => ({
            token: null,
            username: null,
            expireAt: null,
            setData: (data) => set(data),
            resetData: () => set({ token: null, username: null, expireAt: null }),
        }),
        {
            name: "otp-token",
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);
export const getOtpTokenStore = () => useOtpTokenStore.getState();

export default useOtpTokenStore;
