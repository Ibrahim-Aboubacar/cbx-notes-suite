import { Button } from "@/components/ui/button";
import { memo } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import useDeleteNote from "../../hooks/useDeleteNote.";
import { useNavigate } from "@tanstack/react-router";
import { Edit, EllipsisIcon, Eye, Trash2 } from "lucide-react";
import useUser from "@/features/auth/hooks/useUser";

export const NoteOptions = memo(({ note }: { note: TBasicNote }) => {
    const { toggleModalToOpen } = useDeleteNote();

    const navigate = useNavigate();

    const {
        data: { data },
    } = useUser();
    const isOwner = data?.user?.id == note.user.id;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"outline"} size={"icon"} className="px-0 py-0">
                    <EllipsisIcon className="" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-64" align="end">
                <DropdownMenuLabel className="flex min-w-0 flex-col">
                    <span className="text-foreground truncate text-sm font-medium">Options</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate({ to: "/notes/" + note.id })}>
                    <Eye size={16} className="opacity-60" aria-hidden="true" />
                    <span>Ouvrir</span>
                </DropdownMenuItem>
                {isOwner && (
                    <DropdownMenuItem onClick={() => navigate({ to: "/notes/" + note.id + "/edit" })}>
                        <Edit size={16} className="opacity-60" aria-hidden="true" />
                        <span>Modifier</span>
                    </DropdownMenuItem>
                )}
                {isOwner && (
                    <DropdownMenuItem variant="destructive" onClick={() => toggleModalToOpen(note.id)}>
                        <Trash2 size={16} className="opacity-60" aria-hidden="true" />
                        <span>Supprimer</span>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
});
