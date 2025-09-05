import NoDataIllustration from '@/assets/SVGs/empty-note.svg';
import { DeleteNoteAlert } from '@/components/Notes/DeleteNoteAlert';
import { LoaderComponent } from '@/components/Notes/LoaderComponent';
import { NoteOptionsBottomSheet } from '@/components/Notes/NoteOptionsBottomSheet';
import useGetNotesQuery, { getNotesQueryOptions } from '@/features/notes/query/getNotesQuery';
import NoteList from '@/features/notes/screens/NoteList';
import useToggle from '@/hooks/useToggle';
import { cn } from '@/lib/utils';
import { VibrationService } from '@/services/VibrationService';
import BottomSheet from '@gorhom/bottom-sheet';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useRef, useState } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function HomeScreen() {
    const [showDeleteAlert, setShowDeleteAlert] = useToggle(false);
    const [bottomSheetState, setBottomSheetState] = useState<number>(-1);

    const bottomSheetRef = useRef<BottomSheet>(null);
    const [selectedNote, setSelectedNote] = useState<TBasicNote | null>(null);
    const queryClient = useQueryClient();
    const { data, isPending, isRefetching } = useGetNotesQuery({ type: 'myNotes', searchQery: {} });

    const onRefresh = () => {
        queryClient.refetchQueries(getNotesQueryOptions({ type: 'myNotes', searchQery: {} }));
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
    const isEmpty = !isPending && data && data.notes.length === 0;
    return (
        <GestureHandlerRootView className="relative">
            {isPending && <LoaderComponent />}
            <DeleteNoteAlert note={selectedNote} onClose={() => setShowDeleteAlert(false)} open={showDeleteAlert} />
            <ScrollView
                nestedScrollEnabled={true}
                //
                refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={onRefresh} tintColor="#0d9488" />}
                className="bg-teal-50 px-6 pt-0">
                <View className="h-16 justify-center">
                    <Text className="font-bold text-3xl">Mes Notes</Text>
                </View>
                <View className={cn('gap-5 pb-20 pt-2', isEmpty && 'pb-0 pt-32')}>
                    <NoteList notes={data?.notes || []} onOptionPress={onOptionPress} />

                    {isEmpty && (
                        <View className="flex-1 items-center justify-center">
                            <View className="gap-0">
                                <NoDataIllustration width={270} height={270} />
                                <Text className="mt-2 text-center font-medium text-lg text-neutral-500">Aucune note partagée avec vous</Text>
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
            <NoteOptionsBottomSheet
                onDeletePress={() => {
                    if (selectedNote) {
                        setShowDeleteAlert(true);
                    }
                }}
                selectedNote={selectedNote}
                index={bottomSheetState}
                sheetRef={bottomSheetRef}
                onChange={handleSheetChanges}
            />
        </GestureHandlerRootView>
    );
}
