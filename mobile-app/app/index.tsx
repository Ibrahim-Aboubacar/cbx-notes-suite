// import { useAppStartupStore } from '@/store/AppStartupStore';
import useTokenStore from '@/features/auth/store/tokenStore';
import { useAppStartupStore } from '@/store/AppStartupStore';
import { Redirect } from 'expo-router';
// import { useAppStartupStore } from 'store/AppStartupStore';

export default function IndexScreen() {
    const { user } = useTokenStore();

    const { hasCompletedOnboarding } = useAppStartupStore();

    if (!hasCompletedOnboarding) {
        return <Redirect href="/(onboarding)" />;
    }
    if (!user) {
        return <Redirect href="/(auth)" />;
    }
    return <Redirect href="/(tabs)" />;
}
