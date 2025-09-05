import { memo, useState } from 'react';
import { Text, View } from 'react-native';
import { NoteDetailsMetaData } from '../components/NoteDetailsMetaData';
import { NoteDetailsTabs } from '../components/NoteDetailsTabs';

export default function NoteDetailsScreen({ note }: { note: TDetailedNote }) {
    const [selectedTab, setSelectedTab] = useState<'content' | 'friends'>('content');
    // const {
    //     data: { data },
    // } = useUser();
    // const isOwner = data?.user?.id === note.user.id;
    // const hasExpired = !!(note.expirationDate && new Date(note.expirationDate) < new Date());
    return (
        <View>
            <NoteDetailsMetaData note={note} />
            <NoteDetailsTabs note={note} selectedTab={selectedTab} onChange={setSelectedTab} />

            <NoteDetailsContent note={note} />
        </View>
    );
}

const NoteDetailsContent = memo(({ note }: { note: TDetailedNote }) => {
    return <Text className="font-RobotoRegular mt-10 text-xl">{note.content}</Text>;
});
