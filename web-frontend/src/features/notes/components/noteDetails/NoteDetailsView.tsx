import useUser from "@/features/auth/hooks/useUser";
import { memo } from "react";
import ReactMarkdown from "react-markdown";
import { useToggle } from "react-use";
import remarkGfm from "remark-gfm";
import { AnimatePresence, motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const NoteDetailsView = memo(({ note }: { note: TDetailedNote }) => {
    const [showFriends, toggleShowFriends] = useToggle(false);
    const {
        data: { data },
    } = useUser();
    const isOwner = data?.user?.id == note.user.id;
    return (
        <motion.div className="flex flex-col gap-2">
            {isOwner && (
                <div className="flex justify-end items-center mt-2">
                    <Label>
                        <span className="ml-2 text-sm font-medium">Afficher les amis</span>
                        <Switch checked={showFriends} onCheckedChange={toggleShowFriends} />
                    </Label>
                </div>
            )}
            <hr className="border-teal-600/10 my-4" />
            <motion.div className="flex gap-2">
                <motion.div layout key={note.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="prose flex-1 prose-teal max-w-none p-3 min-h-[calc(100%-4.5rem-5rem-2rem)] pb-20">
                    <ReactMarkdown children={note.content} remarkPlugins={[remarkGfm]} />
                </motion.div>
                <AnimatePresence>
                    {showFriends && isOwner && (
                        <motion.div
                            layout
                            //
                            initial={{ opacity: 0, width: "0rem" }}
                            animate={{ opacity: 1, width: "15rem" }}
                            exit={{ opacity: 0, width: "0rem" }}
                            className="max-w-[15rem] border-l pl-2"
                        >
                            <div className="sticky top-1 w-[14rem]">
                                <div className="h-8 flex items-center p-2 text-neutral-500">
                                    <h3 className="text-lg font-semibold ">Amis(es) ({note?.sharedWith?.length})</h3>
                                </div>
                                <div className="flex flex-1 flex-col gap-2 px-2 mt-3">
                                    {note?.sharedWith?.map((user) => (
                                        <div key={user.id} className="flex items-center gap-2 border rounded-xl p-2">
                                            <span className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-full">{user.pseudo.charAt(0).toUpperCase()}</span>
                                            <div className="flex flex-col">
                                                <p className="font-medium text-sm leading-3 text-neutral-600 text-nowrap">{user.pseudo}</p>
                                                <p className="font-medium text-xs text-neutral-500 text-nowrap">{user.email}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
});
