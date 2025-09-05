import useDeleteNoteQuery from '@/features/notes/query/deleteNoteQuery';
import useToggle from '@/hooks/useToggle';
import { ToastService } from '@/services/toastService/toastService';
import { VibrationService } from '@/services/VibrationService';
import { PlatformPressable } from '@react-navigation/elements';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { memo } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

export const DeleteNoteAlert = memo(({ note, onClose, open }: { note: TBasicNote | null; onClose: () => void; open: boolean }) => {
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
        <View className="absolute z-10 items-center justify-center bg-teal-950/60_ -inset-40 isolate">
            <PlatformPressable
                pressOpacity={0.9}
                onPress={() => {
                    if (isLoading) return;
                    VibrationService.selectionChange();
                    onClose();
                }}
                className="absolute z-20 items-center justify-center -inset-40 bg-teal-950/60">
                <View />
            </PlatformPressable>
            <View className="relative z-20 max-w-[85%] rounded-lg bg-white p-6">
                <Text className="text-2xl font-bold text-red-500">Supprimer la note</Text>
                <Text className="mt-3 text-lg font-medium">Voulez-vous vraiment supprimer la note </Text>
                <Text className="mt-0 text-lg font-medium">{note?.title}</Text>
                <View className="flex gap-5 mt-5">
                    <TouchableOpacity onPress={handleDelete} disabled={isLoading} className="items-center px-6 py-3 bg-red-100 rounded-xl">
                        {!isLoading && <Text className="text-xl font-semibold text-red-500">Oui</Text>}
                        {isLoading && <ActivityIndicator color="#ef4444" />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClose} disabled={isLoading} className="items-center px-6 py-3 rounded-xl bg-neutral-200/60">
                        <Text className="text-xl font-semibold text-neutral-700">Non</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
});
