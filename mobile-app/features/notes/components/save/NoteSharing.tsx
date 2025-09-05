import { InfoIcon } from "lucide-react";
import { memo } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import TagInput from "@/components/ui/TagInput";
import useNoteEditor from "@/features/notes/store/noteEditorStore";

export const NoteSharing = memo(() => {
    const { friendEmails, setFriendEmails } = useNoteEditor();

    return (
        <div className="mt-2">
            <div className=" font-medium flex items-center gap-2">
                <p className="">Partage avec mes amis(es)</p>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <InfoIcon className="size-4 opacity-50 mt-0.5" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <div className="max-w-48 text-neutral-500 p-1">
                            <p className="font-bold text-teal-700">
                                Partage avec des <span className="underline">amis(es)</span>
                            </p>
                            <p className="text-xs mt-1">
                                Votre note apparaitra dans l'onglet "<strong className="text-teal-700">Partagé avec moi</strong>" de vos amis(es) avec lesquels vous avez partagé votre note.
                            </p>
                        </div>
                    </TooltipContent>
                </Tooltip>
            </div>
            <p className="text-muted-foreground text-sm mb-">Partagez vos notes avec vos amis(es) en ajoutant leurs emails</p>
            <p className="text-muted-foreground text-xs mb-2 font-medium">
                NB: Taper sur "<strong className="text-teal-700 font-semibold">Entrer</strong>" pour ajouter un ami
            </p>
            <TagInput tags={friendEmails} setTags={setFriendEmails} placeholder="Entrez les emails de vos amis(es)" />
        </div>
    );
});
