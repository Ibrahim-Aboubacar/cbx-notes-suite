import { Button } from "@/components/ui/button";

import useNoteEditor from "@/features/notes/store/noteEditorStore";
import useRouter from "@/hooks/useRouter";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Route = createFileRoute("/_app/notes/new/preview")({
    component: RouteComponent,
});

function RouteComponent() {
    const router = useRouter();
    const { note, title } = useNoteEditor();
    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center py-2 ">
                <div className="flex items-center gap-4">
                    <Button onClick={router.back} variant="outline" size="icon" className="">
                        <ArrowLeft className="" />
                    </Button>
                    <h1 className="text-2xl font-bold">{title}</h1>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="outline" className="px-0 py-0 ">
                        <Link to="/notes/new" className="px-4 py-2">
                            Modifier
                        </Link>
                    </Button>
                    <Button variant="default">Enregistrer</Button>
                </div>
            </div>
            <div className="flex-1 mt-4 space-y-2 flex flex-col">
                <div className="p-1 flex-1">
                    <div className="prose prose-teal max-w-none h-[calc(100%-2.5rem)]">
                        <ReactMarkdown children={note} remarkPlugins={[remarkGfm]} />
                    </div>
                </div>
            </div>
        </div>
    );
}
