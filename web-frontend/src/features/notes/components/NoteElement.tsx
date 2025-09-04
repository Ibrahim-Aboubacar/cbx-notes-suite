import useOtpTokenStore from "@/features/auth/store/otpTokenStore";
import { CalendarRange, Earth, Lock, TagIcon, UsersRound } from "lucide-react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { memo, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { useToggle } from "react-use";
import { useQueryClient } from "@tanstack/react-query";
import { NoteOptions } from "./NoteElement/NoteOptions";
import { DeleteNoteAlert } from "./DeleteNoteAlert";
import { getNoteQueryOptions } from "../query/getNoteQuery";

const NoteElement = memo(({ note }: { note: TBasicNote }) => {
    const queryClient = useQueryClient();
    const [hasBeenPrefetched, toggleHasBeenPrefetched] = useToggle(false);
    const { user: authUser } = useOtpTokenStore();
    const user: TUser = note.user;

    const handlePrefetch = useCallback(() => {
        if (!hasBeenPrefetched) {
            queryClient.prefetchQuery(getNoteQueryOptions({ noteId: note.id }));
            toggleHasBeenPrefetched(true);
        }
    }, [hasBeenPrefetched, note.id, queryClient]);

    return (
        <div onMouseEnter={handlePrefetch} className="border h-full bg-white border-neutral-200 rounded-3xl p-4 flex flex-col">
            <DeleteNoteAlert note={note} />
            <div className=" flex-1">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-full">{user.pseudo.charAt(0).toUpperCase()}</span>
                        <div className="flex flex-col leading-none">
                            <span className="font-medium">{authUser?.id == user.id ? "Vous" : user.pseudo}</span>
                            <span className="text-xs text-muted-foreground">{user.email}</span>
                        </div>
                    </div>
                    <NoteOptions note={note} />
                </div>
                <h4 className="text-lg font-semibold mt-4 hover:cursor-pointer hover:text-teal-600 hover:underline">
                    <Link to={"/notes/" + note.id}>{note.title}</Link>
                </h4>
                <div className="opacity-55 mt-5 relative">
                    <span className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-0"></span>
                    <ReactMarkdown children={note.content} remarkPlugins={[remarkGfm]} />
                </div>
            </div>
            <div className={cn("min-h-18 ")}>
                <div className="mt-3 flex items-center gap-2 text-neutral-500">
                    {note.isPublic ? <Earth className="size-4" /> : <Lock className="size-4" />}
                    <span className="font-medium text-sm">{note.isPublic ? "Note Publique" : "Note Privée"}</span>
                </div>
                <p className="mt-2 text-sm font-medium flex items-center gap-1 text-neutral-500">
                    <TagIcon className="size-4" />
                    Tags:{" "}
                </p>
                <div className="mt-2 flex gap-1.5 flex-wrap_ overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    {note.tags.map((tag) => (
                        <span key={tag.id} className="shrink-0 bg-teal-100/50 border border-teal-800/50 text-teal-950 text-xs px-2 py-0.5 rounded-full">
                            {tag.name}
                        </span>
                    ))}
                    {note.tags.length == 0 && (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="text-neutral-500 text-xs">Aucun tag</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="text-neutral-400 flex justify-between items-center mt-2 border-t pt-2">
                <div className="flex items-center gap-2">
                    <span className="text-neutral-400 flex size-9 items-center justify-center rounded-full">
                        <UsersRound strokeWidth={1.5} className="size-5" />
                    </span>
                    <div className="flex flex-col leading-none">
                        <span className="text-[0.6rem] text-muted-foreground">Partagé avec</span>
                        <span className="text-neutral-500 text-sm font-medium">{note?.sharedWithCount || 0} amis(es)</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <CalendarRange strokeWidth={1} className="size-6" />
                    <div className="flex flex-col leading-none">
                        <span className="text-[0.6rem] text-muted-foreground">Créé le</span>
                        <span className="text-neutral-500 text-sm font-medium">{new Date(note.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default NoteElement;
