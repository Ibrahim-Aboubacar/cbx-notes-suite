import PageHeader from '@/components/AppHeader/PageHeader';
import { Stack } from 'expo-router';
import { AddNoteTitleScreenNextButton } from './new';
import { AddNoteContentScreenNextButton } from './note-content';
import { AddNoteFreindsScreenNextButton } from './set-freinds';
import { AddNoteTagsSelectScreenNextButton } from './tags-select';
import { AddNoteVisibilitySettingScreenNextButton } from './visibility-setting';

export default function NotesLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                header: (props) => <PageHeader {...props} />,
            }}>
            <Stack.Screen
                name="new"
                options={{
                    title: 'Nouvelle note',
                    headerShown: true,
                    headerBackVisible: true,
                    headerRight: () => <AddNoteTitleScreenNextButton />,
                }}
            />
            <Stack.Screen
                name="note-content"
                options={{
                    title: 'Contenu de la note',
                    headerShown: true,
                    headerBackVisible: true,
                    headerRight: () => <AddNoteContentScreenNextButton />,
                }}
            />
            <Stack.Screen
                name="tags-select"
                options={{
                    title: 'Tags',
                    headerShown: true,
                    headerBackVisible: true,
                    headerRight: () => <AddNoteTagsSelectScreenNextButton />,
                }}
            />
            <Stack.Screen
                name="visibility-setting"
                options={{
                    title: 'Visibilité',
                    headerShown: true,
                    headerBackVisible: true,
                    headerRight: () => <AddNoteVisibilitySettingScreenNextButton />,
                }}
            />
            <Stack.Screen
                name="set-freinds"
                options={{
                    title: 'Partager',
                    headerShown: true,
                    headerBackVisible: true,
                    headerRight: () => <AddNoteFreindsScreenNextButton />,
                }}
            />
            <Stack.Screen name="[id]" options={{ headerShown: false }} />
        </Stack>
    );
}
