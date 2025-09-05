import { InfoIcon } from "lucide-react";
import { memo } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import useNoteEditor from "@/features/notes/store/noteEditorStore";

export const NoteVisibility = memo(() => {
    const { isPublic: isNoteVisible, toggleIsPublic: toggleNoteVisible } = useNoteEditor();

    return (
        <div className="mt-2">
            <div className="font-medium flex items-center gap-2">
                <p className="">Visiblité de la note</p>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <InfoIcon className="size-4 opacity-50 mt-0.5 hover:opacity-100" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <div className="max-w-48 text-neutral-500 p-1">
                            <p className="font-bold text-teal-700">
                                Note en visiblité <span className="underline">publique</span>
                            </p>
                            <p className="text-xs mt-1">
                                Votre note apparaitra dans l'onglet "<strong className="text-teal-700">Explore</strong>" de tout les utilisateurs avec votre pseudo et la date de creation.
                            </p>
                        </div>
                    </TooltipContent>
                </Tooltip>
            </div>
            <p className="text-muted-foreground text-sm">Une visiblité publique permettra à tout le monde de voir votre note.</p>
            <div className="flex items-center space-x-2 mt-2">
                <Switch checked={isNoteVisible} onCheckedChange={toggleNoteVisible} id="visibility" />
                <Label htmlFor="visibility">Publique</Label>
            </div>
        </div>
    );
});
