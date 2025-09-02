import useNoteEditor from "@/features/notes/store/noteEditorStore";
import { TagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MarkDownEditor from "./MarkDownEditor";
import EditorePreview from "./EditorePreview";
import NoteTagsDialog from "./NoteTagsDialog";

export default function NoteEditor() {
    const { title, setTitle, tags } = useNoteEditor();

    return (
        <div className="h-[calc(100%-3.25rem-2.5rem)] flex-1 space-y-2 flex flex-col">
            <div className="flex items-center justify-between gap-4">
                <Input type="text" value={title} placeholder="Titre" className="w-1/2 mt-4" onChange={({ target }) => setTitle(target.value)} />
                <NoteTagsDialog>
                    <Button variant="outline" className="px-0 py-0 ">
                        <TagIcon /> {tags.length} Tags
                    </Button>
                </NoteTagsDialog>
            </div>
            <div className="relative bg-white grid grid-cols-2 border rounded-lg flex-1 overflow-y-auto">
                <MarkDownEditor />
                <EditorePreview />
            </div>
        </div>
    );
}
