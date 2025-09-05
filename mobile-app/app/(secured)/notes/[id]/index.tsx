import { LoaderComponent } from '@/components/Notes/LoaderComponent';
import useNoteQuery from '@/features/notes/query/getNoteQuery';
import NoteDetailsScreen from '@/features/notes/screens/NoteDetailsScreen';
import { useLocalSearchParams } from 'expo-router';
import { RefreshControl, ScrollView, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function NoteDetail() {
    const { id } = useLocalSearchParams();
    const { data, isPending, isRefetching, refetch } = useNoteQuery({ noteId: id as string });
    const onRefresh = () => {
        refetch();
    };
    return (
        <GestureHandlerRootView className="relative">
            {isPending && <LoaderComponent />}
            <ScrollView
                //
                refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={onRefresh} tintColor="#0d9488" />}
                className="bg-teal-50 px-6 pt-0">
                <NoteDetailsScreen note={data.note} />
                <View className="gap-5 pb-20 pt-2"></View>
            </ScrollView>
        </GestureHandlerRootView>
    );
}
