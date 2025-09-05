import useGetTags from '@/features/notes/query/getTagsQuery';
import useNoteEditor from '@/features/notes/store/noteEditorStore';
import { cn } from '@/lib/utils';
import { VibrationService } from '@/services/VibrationService';
import { useRouter } from 'expo-router';
import { ChevronRight, Info } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

export default function TagsSelect() {
    const { data } = useGetTags();
    const { tags, addTag, setTags } = useNoteEditor();
    return (
        <View className="relative flex-1 bg-teal-50 px-6 pt-0">
            <View className="justify-center ">
                <Text className="font-robotoMedium mb-2 text-lg text-neutral-600">Selectionnez les tags qui correspondent à votre note : </Text>
                <View className="my-4 flex-row flex-wrap gap-4">
                    {data?.tags.map((tag) => {
                        const isSelected = tags.includes(tag.id);
                        return (
                            <Pressable
                                onPress={() => {
                                    if (isSelected) {
                                        setTags((tags) => tags.filter((id) => id !== tag.id));
                                    } else {
                                        addTag(tag.id);
                                    }
                                    VibrationService.selectionChange();
                                }}
                                key={tag.id}
                                className={cn(
                                    'h-10 w-[30%] min-w-[30%] flex-row items-center justify-center gap-2 rounded-lg border border-teal-400 bg-white',
                                    isSelected && 'border-teal-600 bg-teal-600'
                                )}>
                                <Text className={cn(isSelected && 'text-teal-50')}>{tag.name}</Text>
                            </Pressable>
                        );
                    })}
                </View>
                <View className="mt-3 w-full flex-row items-center gap-2">
                    <Info size={18} strokeWidth={1.5} color="#737373" />
                    <Text className="font-regular text-lg text-neutral-500">Vous avez {tags.length} tag(s) selectionné(s) </Text>
                </View>
            </View>
            <View className="gap-5 pb-20 pt-2"></View>
        </View>
    );
}

export const AddNoteTagsSelectScreenNextButton = () => {
    const { push } = useRouter();

    function handlePress() {
        VibrationService.selectionChange();
        push({
            pathname: '/(secured)/notes/visibility-setting',
        });
    }
    return (
        <Pressable onPress={handlePress} className={cn('flex-row items-center rounded-full py-2 pl-5')}>
            <Text className={cn('font-RobotoMedium text-xl text-teal-600')}>Suivant</Text>
            <ChevronRight size={22} strokeWidth={2} color={'#0d9488'} />
        </Pressable>
    );
};
