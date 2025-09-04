import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import useNoteEditor from "@/features/notes/store/noteEditorStore";
import TagsSelect from "@/features/notes/components/TagsSelect";
import { Loader2, XIcon } from "lucide-react";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import useGetTags from "../query/getTagsQuery";

export default function NoteTagsDialog({ children }: { children: ReactNode }) {
    const { data, isPending } = useGetTags();
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
                                        const tagInstance = (data?.tags || []).find((sysTag) => sysTag.id == tag);

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
                        <div className="mt-4 relative">
                            {isPending && (
                                <div className="absolute z-10 bg-white/80 inset-0 flex items-center justify-center">
                                    <Loader2 className="animate-spin size-6 text-teal-500" />
                                </div>
                            )}
                            <TagsSelect
                                tags={data?.tags || []}
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

function Tag({ tag, onRemove }: { tag: { id: string; name: string }; onRemove?: (id: string) => void }) {
    return (
        <span className="inline-flex flex-1 h-8 gap-2 bg-teal-50 border-teal-700/30 text-teal-950 max-w-48 items-center justify-between pl-2 pr-1.5 py-1 text-xs font-medium rounded-md border">
            {tag.name}
            {onRemove && <XIcon onClick={() => onRemove(tag.id)} className="size-4 cursor-pointer opacity-50 hover:opacity-100" />}
        </span>
    );
}
