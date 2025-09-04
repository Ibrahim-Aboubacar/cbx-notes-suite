import useUser from "@/features/auth/hooks/useUser";
import { CalendarRange, Earth, Lock, Tag, UserRound, UsersRound } from "lucide-react";
import { memo } from "react";

export const NoteMetaData = memo(({ note }: { note: TDetailedNote }) => {
    const {
        data: { data },
    } = useUser();
    const isOwner = data?.user?.id == note.user.id;
    return (
        <div className="text-neutral-400 min-h-20">
            <div className="flex items-center justify-between">
                <div className="flex flex-col items-center gap-2">
                    {/* Author */}
                    <div className="flex items-center gap-2 w-full">
                        <div className="flex size-7 items-center justify-center">
                            <UserRound strokeWidth={1.5} className="size-6" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-[0.6rem] text-muted-foreground">Auteur</span>
                            <span className="text-neutral-600 text-sm font-medium">{isOwner ? "Vous" : note?.user.pseudo}</span>
                        </div>
                    </div>
                    {/* Visibility */}
                    <div className="flex items-center gap-2 w-full">
                        <div className="flex size-7 items-center justify-center">{note.isPublic ? <Earth strokeWidth={1.5} className="size-6" /> : <Lock strokeWidth={1.5} className="size-6" />}</div>
                        <div className="flex flex-col leading-none">
                            <span className="text-[0.6rem] text-muted-foreground">Visibilité</span>
                            <span className="text-neutral-600 text-sm font-medium">{note?.isPublic ? "Publique" : "Privée"}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2 w-full">
                        <div className="flex size-7 items-center justify-center">
                            <UsersRound strokeWidth={1.5} className="size-6" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-[0.6rem] text-muted-foreground">Partagé avec</span>
                            {isOwner ? <span className="text-neutral-600 text-sm font-medium">{note?.sharedWith?.length || 0} amis(es)</span> : <span className="text-neutral-600 text-3xl font-medium leading-7 -mb-2">*****</span>}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 w-full">
                        <div className="flex size-7 items-center justify-center">
                            <CalendarRange strokeWidth={1.5} className="size-6" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-[0.6rem] text-muted-foreground">Créé le</span>
                            <span className="text-neutral-600 text-sm font-medium">{new Date(note.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-2">
                <p className="text-lg font-medium text-neutral-500">
                    Tags ({note.tags.length}) : {note.tags.length == 0 && <span className="text-neutral-400">Aucun tag</span>}
                </p>
                <div className="flex gap-1.5 flex-wrap mt-2">
                    {note.tags.map((tag) => (
                        <span key={tag.id} className="bg-teal-100/50 border flex items-center gap-1.5 border-teal-800/50 text-teal-950 text-sm px-2 py-0.5 rounded-full">
                            <Tag strokeWidth={1.5} className="size-3.5" />
                            {tag.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
});
