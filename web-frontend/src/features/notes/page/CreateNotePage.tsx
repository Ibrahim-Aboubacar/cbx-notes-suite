import NoteEditor from "@/features/notes/components/NoteEditor";
import Header from "../components/Header";

export default function CreateNotePage() {
    return (
        <div className="h-full flex flex-col">
            <Header />
            <NoteEditor />
            <div className="h-10" />
        </div>
    );
}
