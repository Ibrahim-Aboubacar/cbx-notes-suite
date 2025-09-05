import { LoaderComponent } from '@/components/Notes/LoaderComponent';
import { NoteOptionsBottomSheet } from '@/components/Notes/NoteOptionsBottomSheet';
import useDeleteNoteQuery from '@/features/notes/query/deleteNoteQuery';
import useGetNotesQuery, { getNotesQueryOptions } from '@/features/notes/query/getNotesQuery';
import NoteList from '@/features/notes/screens/NoteList';
import useToggle from '@/hooks/useToggle';
import { ToastService } from '@/services/toastService/toastService';
import { VibrationService } from '@/services/VibrationService';
import BottomSheet from '@gorhom/bottom-sheet';
import { PlatformPressable } from '@react-navigation/elements';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
                <View className="gap-5 pb-20 pt-2">
                    <NoteList notes={data?.notes || []} onOptionPress={onOptionPress} />
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

const DeleteNoteAlert = ({ note, onClose, open }: { note: TBasicNote | null; onClose: () => void; open: boolean }) => {
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useToggle(false);
    const { mutateAsync: deleteNote } = useDeleteNoteQuery();
    const { replace } = useRouter();
    if (!open || !note) return null;
    const handleDelete = () => {
        setIsLoading(true);
        deleteNote({
            noteId: note.id,
        })
            .then(() => {
                // queryClient.setQueryData(["notes", "get", note.id], note)
                // prefetch the note to be able to navigate to it without waiting long
                queryClient.invalidateQueries({ queryKey: ['notes', 'get'], exact: false });

                setTimeout(() => {
                    ToastService.success({
                        title: 'Note supprimée',
                        description: 'Votre note a été supprimée avec succès',
                    });
                    queryClient.invalidateQueries({
                        queryKey: ['notes', 'get'],
                        exact: false,
                    });
                }, 300);
                onClose();
                replace('/(tabs)');
            })
            .catch((err: any) => {
                ToastService.error({
                    title: 'Oups!!!',
                    description: 'Une erreur est survenue lors de la suppression de la note',
                });
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    return (
        <View className="bg-teal-950/60_ absolute -inset-40 isolate z-10 items-center justify-center">
            <PlatformPressable
                pressOpacity={0.9}
                onPress={() => {
                    if (isLoading) return;
                    VibrationService.selectionChange();
                    onClose();
                }}
                className="absolute -inset-40 z-20 items-center justify-center bg-teal-950/60">
                <View />
            </PlatformPressable>
            <View className="relative z-20 max-w-[85%] rounded-lg bg-white p-6">
                <Text className="font-bold text-2xl text-red-500">Supprimer la note</Text>
                <Text className="mt-3 font-medium text-lg">Voulez-vous vraiment supprimer la note </Text>
                <Text className="mt-0 font-medium text-lg">{note?.title}</Text>
                <View className="mt-5 flex gap-5">
                    <TouchableOpacity onPress={handleDelete} disabled={isLoading} className="items-center rounded-xl bg-red-100 px-6 py-3">
                        {!isLoading && <Text className="text-xl font-semibold text-red-500">Oui</Text>}
                        {isLoading && <ActivityIndicator color="#ef4444" />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClose} disabled={isLoading} className="items-center rounded-xl bg-neutral-200/60 px-6 py-3">
                        <Text className="text-xl font-semibold text-neutral-700">Non</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
