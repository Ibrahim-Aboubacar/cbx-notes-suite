import useNoteEditor from "../store/noteEditorStore";
import { markdown } from "@codemirror/lang-markdown";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import CodeMirror from "@uiw/react-codemirror";
import { Label } from "@/components/ui/label";
import { useToggle } from "react-use";
import { cn } from "@/lib/utils";

export default function MarkDownEditor() {
    const { note, setNote, wordsCount } = useNoteEditor();
    const [isDarkModeEnabeled, toggleDarkModeEnabeled] = useToggle(false);

    return (
        <div className="rounded-l-lg border-r">
            <div className="sticky top-0 z-10 bg-teal-50 h-10 flex items-center justify-between px-4 text-muted-foreground border-b">
                <Label>Contenu de la note</Label>
                <div className="flex items-center justify-center gap-2">
                    <div className="">
                        <span className="text-xs font-medium">{wordsCount} mots</span>
                    </div>
                    <Button variant="outline" size="icon" className={cn("size-6 rounded-sm", isDarkModeEnabeled ? "bg-teal-600 text-white" : "")} onClick={toggleDarkModeEnabeled}>
                        {isDarkModeEnabeled ? <MoonIcon /> : <SunIcon />}
                    </Button>
                </div>
            </div>
            <div className="w-full h-[calc(100%-3rem)] p-0">
                <CodeMirror
                    value={note}
                    onChange={(value) => setNote(value)}
                    className="h-full bg-transparent"
                    theme={isDarkModeEnabeled ? "dark" : "light"}
                    extensions={[markdown()]} //
                />
                {/* <textarea onChange={({ target }) => setNote(target.value)} className="h-full w-full p-3 [resize:none]">
                    {note}
                </textarea> */}
            </div>
        </div>
    );
}
