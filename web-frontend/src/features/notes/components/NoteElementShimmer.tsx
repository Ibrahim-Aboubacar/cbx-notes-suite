import { memo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const NoteElementShimmer = memo(() => {
    return (
        <motion.div
            //
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            className="border border-neutral-200 rounded-3xl p-4 flex flex-col"
        >
            <div className=" flex-1">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="bg-neutral-300 animate-pulse delay-500 text-primary-foreground flex size-9 items-center justify-center rounded-full"></span>
                        <div className="flex flex-col leading-none gap-1">
                            <div className="font-medium animate-pulse bg-neutral-300 h-2.5 rounded w-19" />
                            <div className="font-medium animate-pulse bg-neutral-300 h-2.5 rounded w-28" />
                        </div>
                    </div>

                    <span className="bg-neutral-300 animate-pulse text-primary-foreground delay-500 flex size-9 items-center justify-center rounded-md"></span>
                </div>
                <div className="font-medium animate-pulse mt-4 bg-neutral-300 h-4 rounded w-56 delay-500" />
                <div className="font-medium animate-pulse mt-3 bg-neutral-300 h-4 rounded w-36 delay-300" />
                <div className="opacity-55 mt-6 relative">
                    <div className="font-medium animate-pulse mt-0 bg-neutral-300 h-2 rounded w-56" />
                    <div className="font-medium animate-pulse mt-3 bg-neutral-300 h-2 rounded w-36 delay-500" />
                    <div className="font-medium animate-pulse mt-3 bg-neutral-300 h-2 rounded w-48" />
                    <div className="font-medium animate-pulse mt-3 bg-neutral-300 h-2 rounded w-28 delay-300" />
                </div>
            </div>
            <div className={cn("min-h-18 ")}>
                <div className="font-medium animate-pulse mt-3 bg-neutral-300 h-3 rounded w-12" />

                <div className="mt-2 flex gap-1.5 flex-wrap">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <span key={index} style={{ animationDelay: `${(index + 1) * 150}ms` }} className="font-medium animate-pulse bg-neutral-300 h-6 w-12 border px-2 py-0.5 rounded-full" />
                    ))}
                </div>
            </div>
            <div className="text-neutral-400 flex justify-between items-center mt-2 border-t pt-2">
                <div className="flex items-center gap-2">
                    <span className="delay-300 text-neutral-400 animate-pulse bg-neutral-300 flex size-9 items-center justify-center rounded-full"></span>
                    <div className="flex flex-col leading-none">
                        <div className="font-medium animate-pulse bg-neutral-300 h-2 rounded w-16" />
                        <div className="font-medium animate-pulse mt-1 bg-neutral-300 h-3 rounded w-20 delay-500" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-neutral-400 animate-pulse bg-neutral-300 flex size-6 items-center justify-center rounded-full delay-300"></span>

                    <div className="flex flex-col leading-none">
                        <div className="font-medium animate-pulse bg-neutral-300 h-2 rounded w-8" />
                        <div className="font-medium animate-pulse mt-1 bg-neutral-300 h-3 rounded w-16 delay-500" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
});
