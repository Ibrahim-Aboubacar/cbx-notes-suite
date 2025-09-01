import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import useNoteEditor from "@/features/notes/store/noteEditorStore";
import TagsSelect from "@/features/notes/components/TagsSelect";
import noDataIllustration from "@/assets/SVGs/no-data.svg";
import { TagIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function NoteEditor() {
    const { note, title, setNote, setTitle, wordsCount, tags } = useNoteEditor();

    return (
        <div className="h-[calc(100%-3.25rem-2.5rem)] flex-1 space-y-2 flex flex-col">
            <div className="flex items-center justify-between gap-4">
                <Input type="text" value={title} placeholder="Titre" className="w-1/2 mt-4" onChange={({ target }) => setTitle(target.value)} />
                <NoteTags>
                    <Button variant="outline" className="px-0 py-0 ">
                        <TagIcon /> {tags.length} Tags
                    </Button>
                </NoteTags>
            </div>
            <div className="relative p-0 grid grid-cols-2 border rounded-lg flex-1 overflow-y-auto">
                <div className="rounded-l-lg border-r">
                    <div className="sticky top-0 bg-teal-50 h-10 flex items-center justify-between px-4 text-muted-foreground border-b">
                        <Label>Contenu de la note</Label>
                        <div className="">
                            <span className="text-xs font-medium">{wordsCount} mots</span>
                        </div>
                    </div>
                    <div className="w-full h-[calc(100%-3rem)] p-0">
                        <textarea onChange={({ target }) => setNote(target.value)} className="h-full w-full p-3 [resize:none]">
                            {note}
                        </textarea>
                    </div>
                </div>
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
            </div>
        </div>
    );
}

const systemTags = [
    { id: "1", name: "Travail" },
    { id: "2", name: "Études" },
    { id: "3", name: "Projet" },
    { id: "4", name: "Idée" },
    { id: "5", name: "Personnel" },
    { id: "6", name: "Urgent" },
    { id: "7", name: "Lecture" },
    { id: "8", name: "Recherche" },
    { id: "9", name: "Tâches" },
    { id: "10", name: "Inspiration" },
    { id: "11", name: "Référence" },
    { id: "12", name: "Meeting" },
    { id: "13", name: "Documentation" },
    { id: "14", name: "Checklist" },
    { id: "15", name: "Brainstorm" },
];

function NoteTags({ children }: { children: ReactNode }) {
    const { tags, setTags } = useNoteEditor();
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tags</DialogTitle>
                    <DialogDescription className="hidden"></DialogDescription>

                    <div>
                        <div className={cn("min-h-18 flex gap-2 border rounded-md flex-wrap p-2", tags.length == 0 && "justify-center items-center border rounded-md")}>
                            {tags.length == 0 ? (
                                <div className="">
                                    <p className="text-xs font-medium text-muted-foreground">Veuiller ajouté un tag</p>
                                </div>
                            ) : (
                                <>
                                    {tags.map((tag) => {
                                        const tagInstance = systemTags.find((sysTag) => sysTag.id == tag);

                                        if (!tagInstance) return;
                                        return (
                                            <Tag
                                                key={tag}
                                                tag={tagInstance}
                                                onRemove={(id) => {
                                                    setTags((prev) => prev.filter((tag) => tag != id));
                                                }}
                                            />
                                        );
                                    })}
                                </>
                            )}
                        </div>
                        <div className="mt-4">
                            <TagsSelect
                                tags={systemTags}
                                onSelect={(state) => {
                                    if (state.selected) {
                                        setTags((prev) => [...new Set([...prev, state.id])]);
                                    } else {
                                        setTags((prev) => prev.filter((tag) => tag != state.id));
                                    }
                                }}
                                selected={tags}
                            />
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
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

function Tag({ tag, onRemove }: { tag: { id: string; name: string }; onRemove?: (id: string) => void }) {
    return (
        <span className="inline-flex flex-1 h-8 gap-2 bg-teal-50 border-teal-700/30 text-teal-950 max-w-48 items-center justify-between pl-2 pr-1.5 py-1 text-xs font-medium rounded-md border">
            {tag.name}
            {onRemove && <XIcon onClick={() => onRemove(tag.id)} className="size-4 cursor-pointer opacity-50 hover:opacity-100" />}
        </span>
    );
}
