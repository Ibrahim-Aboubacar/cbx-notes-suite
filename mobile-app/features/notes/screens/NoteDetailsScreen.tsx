import { useState } from 'react';
import { View } from 'react-native';
import { NoteDetailsContent } from '../components/NoteDetailsContent';
import { NoteDetailsFriends } from '../components/NoteDetailsFriends';
import { NoteDetailsMetaData } from '../components/NoteDetailsMetaData';
import { NoteDetailsTabs } from '../components/NoteDetailsTabs';

export default function NoteDetailsScreen({ note }: { note: TDetailedNote }) {
    const [selectedTab, setSelectedTab] = useState<'content' | 'friends'>('content');
    return (
        <View>
            <NoteDetailsMetaData note={note} />
            <NoteDetailsTabs note={note} selectedTab={selectedTab} onChange={setSelectedTab} />

            {selectedTab === 'content' ? <NoteDetailsContent note={note} /> : <NoteDetailsFriends note={note} />}
        </View>
    );
}
