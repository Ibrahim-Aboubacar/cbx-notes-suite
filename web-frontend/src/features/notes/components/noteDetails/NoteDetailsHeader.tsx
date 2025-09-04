import { Button } from "@/components/ui/button";
import useUser from "@/features/auth/hooks/useUser";
import useRouter from "@/hooks/useRouter";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { memo } from "react";
import { Link } from "@tanstack/react-router";
import useDeleteNote from "../../hooks/useDeleteNote.";

export const NoteDetailsHeader = memo(({ note }: { note: TDetailedNote }) => {
    const { toggleModalToOpen } = useDeleteNote();
    const router = useRouter();
    const {
        data: { data },
    } = useUser();
    const isOwner = data?.user?.id == note.user.id;
    return (
        <>
            <div className="h-14 mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {router.canGoBack() && (
                        <>
                            <Button onClick={router.back} variant="outline" size="sm" className="size-8">
                                <ArrowLeft className="" />
                            </Button>
                            <p className="text-xl font-medium text-neutral-400">Retour</p>
                        </>
                    )}
                </div>
                {isOwner && (
                    <div className="flex items-center gap-2">
                        <Button variant="outline" className="px-0 py-0">
                            <Link to={"/notes/" + note.id + "/edit"} className="px-3 py-2 flex items-center gap-2">
                                <Edit strokeWidth={1.5} className="-ml-1" />
                                Modifier
                            </Link>
                        </Button>
                        <Button className="px-0 py-0" variant="destructive" onClick={() => toggleModalToOpen(note.id)}>
                            <Trash2 strokeWidth={1.5} className="-ml-1" />
                            Supprimer
                        </Button>
                    </div>
                )}
            </div>
            <div className="h-14 flex items-center justify-between">
                <h1 className="text-3xl font-bold">{note.title}</h1>
            </div>
        </>
    );
});
