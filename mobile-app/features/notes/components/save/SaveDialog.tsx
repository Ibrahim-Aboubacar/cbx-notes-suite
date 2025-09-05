import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { memo, type ReactNode } from "react";
import { NoteSharing } from "@/features/notes/components/save/NoteSharing";
import { NoteVisibilityExpiration } from "@/features/notes/components/save/NoteVisibilityExpiration";
import { NoteVisibility } from "@/features/notes/components/save/NoteVisibility";
import useSaveNote from "../../hooks/useSaveNote";

export const SaveDialog = memo(({ children, isEdit }: { children: ReactNode; isEdit: boolean }) => {
    const { handleSubmit, isPending, open, toggleOpen } = useSaveNote({ isEdit });
    return (
        <Dialog
            open={open}
            onOpenChange={(v) => {
                if (!isPending) {
                    toggleOpen(v);
                }
            }}
        >
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enregister la note</DialogTitle>
                    <DialogDescription className="hidden"></DialogDescription>

                    <NoteVisibility />
                    <NoteVisibilityExpiration />
                    <NoteSharing />

                    <div className="flex gap-2 justify-end items-center mt-4">
                        <DialogClose asChild>
                            <Button variant="outline">Fermer</Button>
                        </DialogClose>
                        <Button isPending={isPending} onClick={handleSubmit} variant="default">
                            Enregistrer
                        </Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
});
