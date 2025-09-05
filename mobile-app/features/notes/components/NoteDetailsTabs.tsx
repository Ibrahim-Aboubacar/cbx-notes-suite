import { cn } from '@/lib/utils';
import { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export const NoteDetailsTabs = memo(({ note, selectedTab, onChange }: { note: TDetailedNote; selectedTab: 'content' | 'friends'; onChange: (tab: 'content' | 'friends') => void }) => {
    return (
        <View className="my-4 flex-row gap-2 rounded-2xl bg-neutral-200 p-2">
            <TouchableOpacity onPress={() => onChange('content')} className={cn('flex-1 flex-row items-center justify-center gap-2 rounded-lg py-2', selectedTab === 'content' && 'bg-teal-500')}>
                <Text className={cn('font-RobotoMedium text-lg', selectedTab === 'content' && 'text-teal-50')}>Contenu</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onChange('friends')} className={cn('flex-1 flex-row items-center justify-center gap-2 rounded-lg py-2', selectedTab === 'friends' && 'bg-teal-500')}>
                <Text className={cn('text-neutral-50_ font-RobotoMedium text-lg', selectedTab === 'friends' && 'text-teal-50')}>Amis(es) ({note.sharedWith.length})</Text>
            </TouchableOpacity>
        </View>
    );
});
