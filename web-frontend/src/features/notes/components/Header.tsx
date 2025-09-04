import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import useRouter from "@/hooks/useRouter";
import { SaveDialog } from "./save/SaveDialog";

export default function Header({ title, isEdit }: { title?: string; isEdit: boolean }) {
    const router = useRouter();

    return (
        <div className="h-13 flex justify-between items-center py-2 ">
            <div className="flex items-center gap-4">
                <Button onClick={router.back} variant="outline" size="icon" className="">
                    <ArrowLeft className="" />
                </Button>
                <h1 className="text-2xl font-bold">{title ? title : "Nouvelle note"}</h1>
            </div>
            <div className="flex items-center gap-4">
                <Button variant="outline" className="px-0 py-0">
                    <Link to="/notes/preview" className="px-4 py-2">
                        Prévisualiser
                    </Link>
                </Button>
                <SaveDialog isEdit={isEdit}>
                    <Button variant="default">Enregistrer</Button>
                </SaveDialog>
            </div>
        </div>
    );
}
