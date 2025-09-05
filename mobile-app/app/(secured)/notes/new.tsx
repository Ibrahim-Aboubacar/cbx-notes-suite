import { Input } from '@/components/ui/input';
import useNoteEditor from '@/features/notes/store/noteEditorStore';
import { cn } from '@/lib/utils';
import { VibrationService } from '@/services/VibrationService';
import { useRouter } from 'expo-router';
import { ChevronRight, Info } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

export default function NewNoteScreen() {
    const { setTitle, title } = useNoteEditor();
    return (
        <View className="relative flex-1 bg-teal-50 px-6 pt-0">
            <View className="justify-center ">
                <View className="">
                    <Text className="mb-2 font-medium text-xl text-slate-800">Titre : </Text>
                    <Input
                        placeholder="Titre de la note"
                        value={title}
                        onChangeText={(value) => {
                            setTitle(value);
                        }}
                        error={{ message: '', type: '' }}
                    />
                </View>
                {title.length <= 3 && (
                    <View className="mt-3 flex-row items-center gap-2">
                        <Info size={18} strokeWidth={1.5} color="#737373" />
                        <Text className="font-regular text-lg text-neutral-500">Entrez le titre de votre note pour continuer </Text>
                    </View>
                )}
            </View>
            <View className="gap-5 pb-20 pt-2"></View>
        </View>
    );
}

export const AddNoteTitleScreenNextButton = () => {
    const { push } = useRouter();
    const { title } = useNoteEditor();
    const isDisabled = title.length <= 3;

    function handlePress() {
        if (isDisabled) return;
        VibrationService.selectionChange();
        push({
            pathname: '/(secured)/notes/note-content',
        });
    }
    return (
        <Pressable disabled={isDisabled} onPress={handlePress} className={cn('flex-row items-center rounded-full py-2 pl-5', isDisabled && 'opacity-75')}>
            <Text className={cn('font-RobotoMedium text-xl text-teal-600', isDisabled && 'text-neutral-400')}>Suivant</Text>
            <ChevronRight size={22} strokeWidth={2} color={isDisabled ? '#ccc' : '#0d9488'} />
        </Pressable>
    );
};
