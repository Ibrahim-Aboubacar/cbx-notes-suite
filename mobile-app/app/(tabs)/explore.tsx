import { LoaderComponent } from '@/components/Notes/LoaderComponent';
import { NoteOptionsBottomSheet } from '@/components/Notes/NoteOptionsBottomSheet';
import useGetNotesQuery, { getNotesQueryOptions } from '@/features/notes/query/getNotesQuery';
import NoteList from '@/features/notes/screens/NoteList';
import { VibrationService } from '@/services/VibrationService';
import BottomSheet from '@gorhom/bottom-sheet';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useRef, useState } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function ExploreScreen() {
    const [bottomSheetState, setBottomSheetState] = useState<number>(-1);

    const bottomSheetRef = useRef<BottomSheet>(null);
    const [selectedNote, setSelectedNote] = useState<TBasicNote | null>(null);
    const queryClient = useQueryClient();
    const { data, isPending, isRefetching } = useGetNotesQuery({ type: 'public', searchQery: {} });

    const onRefresh = () => {
        queryClient.refetchQueries(getNotesQueryOptions({ type: 'public', searchQery: {} }));
    };

    const handleSheetChanges = useCallback((index: number) => {
        setBottomSheetState(index);
        console.log('indexChanded', index);
    }, []);

    const onOptionPress = (note: TBasicNote) => {
        setSelectedNote(note);
        VibrationService.selectionChange();
        bottomSheetRef.current?.expand();
    };

    return (
        <GestureHandlerRootView className="relative">
            {isPending && <LoaderComponent />}
            <ScrollView
                nestedScrollEnabled={true}
                //
                refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={onRefresh} tintColor="#0d9488" />}
                className="bg-teal-50 px-6 pt-0">
                <View className="h-16 justify-center">
                    <Text className="font-bold text-3xl">Notes publiques</Text>
                </View>
                <View className="gap-5 pb-20 pt-2">
                    <NoteList notes={data?.notes || []} onOptionPress={onOptionPress} />
                </View>
            </ScrollView>
            <NoteOptionsBottomSheet selectedNote={selectedNote} index={bottomSheetState} sheetRef={bottomSheetRef} onChange={handleSheetChanges} />
        </GestureHandlerRootView>
    );
}
