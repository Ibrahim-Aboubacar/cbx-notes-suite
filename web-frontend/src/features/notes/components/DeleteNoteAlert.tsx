import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import { memo } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import useDeleteNote from "../hooks/useDeleteNote.";

export const DeleteNoteAlert = memo(({ note }: { note: TBasicNote | TDetailedNote }) => {
    const { handleSubmit, isPending, modalOpenToOpen, toggleModalToOpen } = useDeleteNote();
    return (
        <Dialog
            open={modalOpenToOpen == note.id}
            onOpenChange={(v) => {
                if (!isPending) {
                    toggleModalToOpen(v ? note.id : "");
                }
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-destructive flex items-center gap-2">
                        <TriangleAlert />
                        Supprimer la note ?
                    </DialogTitle>
                    <DialogDescription className="hidden"></DialogDescription>
                    <p className="">
                        Voulez-vous vraiment supprimer la note "<span className="font-medium text-primary">{note.title}</span>" ?
                    </p>
                    <p className=" text-neutral-600">NB: Cette action est irréversible.</p>

                    <div className="flex gap-2 justify-end items-center mt-4">
                        <DialogClose asChild>
                            <Button variant="outline">Annuler</Button>
                        </DialogClose>
                        <Button isPending={isPending} onClick={() => handleSubmit(note.id)} variant="destructive">
                            Supprimer
                        </Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
});
