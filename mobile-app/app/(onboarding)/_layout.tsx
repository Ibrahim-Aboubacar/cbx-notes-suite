import { useAppStartupStore } from '@/store/AppStartupStore';
import { Redirect, Stack } from 'expo-router';

export default function RootLayout() {
    const { hasCompletedOnboarding } = useAppStartupStore();

    if (hasCompletedOnboarding) {
        return <Redirect href="/(auth)" />;
    }
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    );
}
