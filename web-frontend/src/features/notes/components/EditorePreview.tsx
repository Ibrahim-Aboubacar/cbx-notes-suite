import useNoteEditor from "../store/noteEditorStore";
import noDataIllustration from "@/assets/SVGs/no-data.svg";
import { Label } from "@/components/ui/label";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function EditorePreview() {
    const { note } = useNoteEditor();

    return (
        <div className="">
            <div className="sticky top-0 bg-teal-50 h-10 flex items-center px-4 text-muted-foreground border-b">
                <Label>Prévisualisation</Label>
            </div>
            {note.length == 0 ? (
                <NoData />
            ) : (
                <div className="prose prose-teal max-w-none p-3 h-[calc(100%-2.5rem)]">
                    <ReactMarkdown children={note} remarkPlugins={[remarkGfm]} />
                </div>
            )}
        </div>
    );
}

function NoData() {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100%-2.5rem)]">
            <img src={noDataIllustration} className="w-full max-w-[10rem]" alt="No data illustration" />
            <p className="text-muted-foreground mt-4 text-sm">Aucun contenu</p>
            <p className="text-muted-foreground mt-2 text-xs">Ajoutez du contenu pour voir le preview</p>
        </div>
    );
}
