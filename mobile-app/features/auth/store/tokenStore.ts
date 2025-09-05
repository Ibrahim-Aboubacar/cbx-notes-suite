import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type TTokenStore = {
    token: string | null;
    user: TUser | null;
    setData: (data: Omit<TTokenStore, "setData" | "resetData">) => void;
    resetData: () => void;
};

const useTokenStore = create(
    persist<TTokenStore>(
        (set) => ({
            token: null,
            user: null,
            setData: (data) => set(data),
            resetData: () => set({ token: null, user: null }),
        }),
        {
            name: "token",
            storage: createJSONStorage(() => AsyncStorage),

        },
    ),
);
export const getTokenStore = () => useTokenStore.getState();

export default useTokenStore;
