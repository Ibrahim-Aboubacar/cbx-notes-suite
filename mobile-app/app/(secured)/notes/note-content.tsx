import { getTagsQueryOptions } from '@/features/notes/query/getTagsQuery';
import useNoteEditor from '@/features/notes/store/noteEditorStore';
import { cn } from '@/lib/utils';
import { VibrationService } from '@/services/VibrationService';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { ChevronRight, Info } from 'lucide-react-native';
import { memo, useEffect, useState } from 'react';
import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Markdown from 'react-native-markdown-display';

export default function NoteContent() {
    const [tab, setTab] = useState<'content' | 'preview'>('content');
    const queryClient = useQueryClient();

    useEffect(() => {
        queryClient.fetchQuery(getTagsQueryOptions());
    }, [queryClient]);

    return (
        <View className="relative flex-1 bg-teal-50 px-6 pt-0">
            <ContentEditorTabs selectedTab={tab} onChange={setTab} />
            {tab === 'content' && <NoteContentEditor />}
            {tab === 'preview' && <NoteContentPreview />}
            <View className="gap-5 pb-20 pt-2"></View>
        </View>
    );
}

const NoteContentEditor = memo(() => {
    const { note, setNote } = useNoteEditor();

    return (
        <View className="flex-1">
            <Text className="mb-2 font-medium text-xl text-slate-800">Contenue : </Text>
            <View className="relative min-h-40 flex-1 rounded-lg border border-neutral-200 bg-white p-3">
                <TextInput
                    style={{
                        flex: 1,
                        textAlignVertical: 'top',
                    }}
                    value={note}
                    onChangeText={setNote}
                    multiline
                />
            </View>
            {note.length <= 3 && (
                <View className="mt-3 flex-row items-center gap-2">
                    <Info size={18} strokeWidth={1.5} color="#737373" />
                    <Text className="font-regular text-lg text-neutral-500">Entrez le contenu de votre note pour continuer </Text>
                </View>
            )}
        </View>
    );
});

const NoteContentPreview = memo(() => {
    const { note } = useNoteEditor();
    return (
        <View className="flex-1">
            <Text className="mb-2 font-medium text-xl text-slate-800">Preview : </Text>
            <Markdown>{note}</Markdown>
        </View>
    );
});

export const AddNoteContentScreenNextButton = () => {
    const { push } = useRouter();
    const { note } = useNoteEditor();
    const isDisabled = note.length <= 10;

    function handlePress() {
        if (isDisabled) return;
        VibrationService.selectionChange();
        push({
            pathname: '/(secured)/notes/tags-select',
        });
    }
    return (
        <Pressable disabled={isDisabled} onPress={handlePress} className={cn('flex-row items-center rounded-full  px-5 py-2', isDisabled && 'opacity-75')}>
            <Text className={cn('font-RobotoMedium text-xl text-teal-600', isDisabled && 'text-neutral-400')}>Suivant</Text>
            <ChevronRight size={22} strokeWidth={2} color={isDisabled ? '#ccc' : '#0d9488'} />
        </Pressable>
    );
};

const ContentEditorTabs = memo(({ selectedTab, onChange }: { selectedTab: 'content' | 'preview'; onChange: (tab: 'content' | 'preview') => void }) => {
    return (
        <View className="my-4 flex-row gap-2 rounded-2xl bg-neutral-200 p-2">
            <TouchableOpacity
                onPress={() => {
                    onChange('content');
                    VibrationService.selectionChange();
                }}
                className={cn('flex-1 flex-row items-center justify-center gap-2 rounded-lg py-2', selectedTab === 'content' && 'bg-teal-500')}>
                <Text className={cn('font-RobotoMedium text-lg', selectedTab === 'content' && 'text-teal-50')}>Contenu</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    onChange('preview');
                    VibrationService.selectionChange();
                }}
                className={cn('flex-1 flex-row items-center justify-center gap-2 rounded-lg py-2', selectedTab === 'preview' && 'bg-teal-500')}>
                <Text className={cn('text-neutral-50_ font-RobotoMedium text-lg', selectedTab === 'preview' && 'text-teal-50')}>Preview</Text>
            </TouchableOpacity>
        </View>
    );
});
