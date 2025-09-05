import { memo } from 'react';
import { View } from 'react-native';
import Markdown from 'react-native-markdown-display';

export const NoteDetailsContent = memo(({ note }: { note: TDetailedNote }) => {
    return (
        <View className="mt-5">
            <Markdown>{note.content}</Markdown>
        </View>
    );
});
