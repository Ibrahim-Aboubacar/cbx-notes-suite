import useUser from '@/features/auth/hooks/useUser';
import { VibrationService } from '@/services/VibrationService';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import { Edit, Eye, Trash2 } from 'lucide-react-native';
import { memo, RefObject } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export const NoteOptionsBottomSheet = memo(
    ({
        selectedNote,
        index,
        sheetRef,
        onChange,
        onDeletePress,
    }: {
        selectedNote: TBasicNote | null;
        index: number;
        sheetRef: RefObject<BottomSheet | null>;
        onChange: (index: number) => void;
        onDeletePress?: () => void;
    }) => {
        const { push } = useRouter();
        const {
            data: { data },
        } = useUser();
        const isOwner = !!(selectedNote ? data?.user?.id === selectedNote?.user.id : false);

        const handleOpenNote = () => {
            if (selectedNote) {
                VibrationService.selectionChange();
                sheetRef.current?.close();
                push({ pathname: '/(secured)/notes/[id]', params: { id: selectedNote.id } });
            }
        };
        const handleEditNote = () => {
            if (selectedNote) {
                VibrationService.selectionChange();
                sheetRef.current?.close();
                push({ pathname: '/(secured)/notes/[id]/edit', params: { id: selectedNote.id } });
            }
        };
        return (
            <BottomSheet
                //
                index={index}
                backdropComponent={(props) => (index !== -1 ? <TouchableOpacity onPress={() => sheetRef.current?.close()} className="flex-1" {...props} /> : null)}
                snapPoints={[isOwner ? 260 : 140]}
                backgroundStyle={{
                    borderWidth: 1,
                    borderColor: '#0d9488',
                }}
                detached={false}
                enablePanDownToClose={true}
                ref={sheetRef}
                onChange={onChange}>
                <BottomSheetView className="flex-1 gap-2 p-6 pt-0">
                    <View className="h-10">
                        <Text className="mt-0 text-xl font-bold text-center text-slate-600">Options</Text>
                    </View>
                    <View className="gap-3">
                        <TouchableOpacity onPress={handleOpenNote} className="flex-row items-center gap-5 px-6 rounded-lg h-14 bg-neutral-100">
                            <Eye size={22} color="#525252" />
                            <Text className="text-xl font-medium text-neutral-600">Ouvrir la note</Text>
                        </TouchableOpacity>
                        {isOwner && (
                            <>
                                <TouchableOpacity onPress={handleEditNote} className="flex-row items-center gap-5 px-6 rounded-lg h-14 bg-neutral-100">
                                    <Edit size={22} color="#525252" />
                                    <Text className="text-xl font-medium text-neutral-600">Modifier la note</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        sheetRef.current?.close();
                                        onDeletePress?.();
                                    }}
                                    className="flex-row items-center gap-5 px-6 rounded-lg h-14 bg-red-50">
                                    <Trash2 size={22} color="#dc2626" />
                                    <Text className="text-xl font-medium text-red-600">Supprimer la note</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </BottomSheetView>
            </BottomSheet>
        );
    }
);
