import PageHeader from '@/components/AppHeader/PageHeader';
import { Stack } from 'expo-router';
import { AddNoteTitleScreenNextButton } from '../new';

export default function NotesLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                header: (props) => <PageHeader {...props} />,
            }}>
            <Stack.Screen
                name="edit"
                options={{
                    title: 'Modifier la note',
                    headerBackVisible: true,
                    headerRight: () => <AddNoteTitleScreenNextButton />,
                }}
            />
            <Stack.Screen name="index" options={{ title: 'Note', headerBackVisible: true, animation: 'fade' }} />
        </Stack>
    );
}
