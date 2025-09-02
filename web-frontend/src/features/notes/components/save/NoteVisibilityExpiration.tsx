import { InfoIcon } from "lucide-react";
import { memo } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DateTimeInput } from "@/components/ui/DateTimeInput";
import { cn } from "@/lib/utils";
import useNoteEditor from "@/features/notes/store/noteEditorStore";

export const NoteVisibilityExpiration = memo(() => {
    const { isNoteVisible, expirationDate, setExpirationDate } = useNoteEditor();

    return (
        <div className={cn("mt-2 transition-opacity", !isNoteVisible && "opacity-20 pointer-events-none select-none grayscale-100")}>
            <div className="font-medium flex items-center gap-2">
                <p className="">Date d'expiration de la visiblité</p>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <InfoIcon className="size-4 opacity-50 mt-0.5 hover:opacity-100" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <div className="max-w-48 text-neutral-500 p-1">
                            <p className="font-bold text-teal-700">
                                Date <span className="underline">d'expiration</span>
                            </p>
                            <p className="text-xs mt-1">
                                Une fois la date d'expiration atteinte, votre note ne sera plus presenter publiquement dans l'onglet "<strong className="text-teal-700">Explore</strong>".
                            </p>
                        </div>
                    </TooltipContent>
                </Tooltip>
            </div>

            <p className="text-muted-foreground text-sm mb-3">Ajouter une date d'expiration de la note</p>
            <DateTimeInput date={new Date(expirationDate)} setDate={setExpirationDate} />
        </div>
    );
});
