import Header from '@/components/AppHeader/Header';
import Profile from '@/components/AppHeader/Profile';
import TabBar from '@/components/TabBar';
import useUser from '@/features/auth/hooks/useUser';
import { Redirect, Tabs } from 'expo-router';

export default function TabLayout() {
    const {
        data: { data, success },
    } = useUser({ refetchInterval: 1000 * 60 * 5 }); // Every 5 minutes

    console.log('Tabs/_layout : ', { data, success });
    if (!success || !data?.user) {
        return <Redirect href="/(auth)" />;
    }

    return (
        <Tabs
            tabBar={(props) => <TabBar {...props} />}
            screenOptions={{
                headerShown: true,
                header(props) {
                    return <Header {...props} />;
                },
                headerRight: () => <Profile />,
            }}>
            <Tabs.Screen name="index" options={{ title: 'Accueil', animation: 'fade' }} />
            <Tabs.Screen name="explore" options={{ title: 'Explore', animation: 'fade' }} />
            <Tabs.Screen name="shared-with-me" options={{ title: 'Partagés avec moi', animation: 'fade' }} />
        </Tabs>
    );
}
