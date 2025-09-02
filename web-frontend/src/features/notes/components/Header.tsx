import { Link } from "@tanstack/react-router";
import { ArrowLeft, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import useRouter from "@/hooks/useRouter";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState, type ReactNode } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import TagInput, { type TInputTag } from "@/components/ui/TagInput";
import { DateTimeInput } from "@/components/ui/DateTimeInput";
import { useToggle } from "react-use";
import { cn } from "@/lib/utils";

export default function Header() {
    const router = useRouter();

    return (
        <div className="h-13 flex justify-between items-center py-2 ">
            <div className="flex items-center gap-4">
                <Button onClick={router.back} variant="outline" size="icon" className="">
                    <ArrowLeft className="" />
                </Button>
                <h1 className="text-2xl font-bold">Nouvelle note</h1>
            </div>
            <div className="flex items-center gap-4">
                <Button variant="outline" className="px-0 py-0">
                    <Link to="/notes/new/preview" className="px-4 py-2">
                        Prévisualiser
                    </Link>
                </Button>
                <SaveDialog>
                    <Button variant="default">Enregistrer</Button>
                </SaveDialog>
            </div>
        </div>
    );
}

function SaveDialog({ children }: { children: ReactNode }) {
    const [friendEmails, setFriendEmails] = useState<TInputTag[]>([]);
    const [expirationDate, setExpirationDate] = useState<Date>(new Date());
    const [isNoteVisible, toggleNoteVisible] = useToggle(false);
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enregister la note</DialogTitle>
                    <DialogDescription className="hidden"></DialogDescription>
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
                        <DateTimeInput date={expirationDate} setDate={setExpirationDate} />
                    </div>

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

                    <div className="flex gap-2 justify-end items-center mt-4">
                        <Button variant="outline">Annuler</Button>
                        <Button variant="default">Enregistrer</Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
