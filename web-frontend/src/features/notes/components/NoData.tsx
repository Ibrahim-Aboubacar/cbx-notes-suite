import { Button } from "@/components/ui/button";
import EmptyNoteIllustrations from "./EmptyNoteIllustrations";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { memo } from "react";

export const NoData = memo(() => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(60vh-12rem)]">
            <EmptyNoteIllustrations />
            {/* Text */}
            <motion.p
                //
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center text-muted-foreground mt-3"
            >
                Aucune note
            </motion.p>
            <motion.p
                //
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-center text-muted-foreground mt-2"
            >
                Ajoutez une note pour commencer
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.4 }} className="">
                <Button size="lg" className="text-sm mt-4">
                    <Link to="/notes/new" className="flex flex-row items-center gap-2 text-sm max-sm:aspect-square max-sm:p-0">
                        <PlusIcon className="opacity-60 size-5 -ml-2" aria-hidden="true" />
                        <span className="max-sm:sr-only">Créer Note</span>
                    </Link>
                </Button>
            </motion.div>
        </div>
    );
});

export const NoPublicData = memo(({ text }: { text?: string }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(60vh-12rem)]">
            <EmptyNoteIllustrations />
            {/* Text */}
            <motion.p
                //
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center text-muted-foreground mt-4"
            >
                {text ? text : "Aucune note partagée publiquement"}
            </motion.p>
        </div>
    );
});
