import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type TAppStartupStore = {
    hasCompletedOnboarding: boolean;
    setCompletedOnboarding: (value: TAppStartupStore['hasCompletedOnboarding']) => void;
    resetOnboarding: () => void;
}

export const useAppStartupStore = create(
    persist<TAppStartupStore>(
        (set) => ({
            hasCompletedOnboarding: false,
            setCompletedOnboarding: (value) => set({ hasCompletedOnboarding: value }),
            resetOnboarding: () => set({ hasCompletedOnboarding: false }),
        }), {
        name: "app-startup",
        storage: createJSONStorage(() => AsyncStorage),
    })

)