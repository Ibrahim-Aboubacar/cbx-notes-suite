import PageHeader from '@/components/AppHeader/PageHeader';
import { Stack } from 'expo-router';

export default function NotesLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                header: (props) => <PageHeader {...props} />,
            }}>
            <Stack.Screen name="new" options={{ title: 'Nouvelle note', headerShown: true, headerBackVisible: true }} />
            <Stack.Screen name="[id]" options={{ headerShown: false }} />
        </Stack>
    );
}
