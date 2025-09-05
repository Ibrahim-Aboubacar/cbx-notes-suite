import { NoteCard } from '../components/NoteCard';
export default function NoteList({ notes, onOptionPress }: { notes: TBasicNote[]; onOptionPress: (note: TBasicNote) => void }) {
    return notes.map((note) => <NoteCard key={note.id} note={note} onOptionPress={onOptionPress} />);
}
