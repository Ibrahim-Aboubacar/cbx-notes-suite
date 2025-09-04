import NoteEditor from "@/features/notes/components/NoteEditor";
import Header from "../components/Header";

export default function EditNotePage({ note }: { note: TDetailedNote }) {
    const title = note.title.length > 20 ? note.title.slice(0, 20) + "..." : note.title;
    return (
        <div className="h-full flex flex-col">
            <Header title={"Modifier la note : " + title} isEdit />
            <NoteEditor />
            <div className="h-10" />
        </div>
    );
}
