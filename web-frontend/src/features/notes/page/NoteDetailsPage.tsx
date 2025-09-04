import { DeleteNoteAlert } from "../components/DeleteNoteAlert";
import { NoteDetailsView } from "../components/noteDetails/NoteDetailsView";
import { NoteDetailsHeader } from "../components/noteDetails/NoteDetailsHeader";
import { NoteMetaData } from "../components/noteDetails/NoteMetaData";

export default function NoteDetailsPage({ note }: { note: TDetailedNote }) {
    return (
        <div className="min-h-[calc(100vh-5rem)] h-full">
            <DeleteNoteAlert note={note} />
            <NoteDetailsHeader note={note} />
            <NoteMetaData note={note} />
            <NoteDetailsView note={note} />
        </div>
    );
}
