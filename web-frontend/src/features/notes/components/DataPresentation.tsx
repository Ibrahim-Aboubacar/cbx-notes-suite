import { AnimatePresence, motion } from "framer-motion";
import NoteElement from "../components/NoteElement";
import { memo, useMemo } from "react";
import { NoMatchingSearchedData } from "../components/NoMatchingSearchedData";
import { NoData } from "../components/NoData";
import { NoteElementShimmer } from "../components/NoteElementShimmer";
import { cn } from "@/lib/utils";

type DataPresentationProp = {
    data?: { notes: TBasicNote[] };
    isPending: boolean;
    search: string;
    noDataComponent?: React.ReactNode;
};

export const DataPresentation = memo(({ data, isPending, search, noDataComponent }: DataPresentationProp) => {
    const notes = useMemo(() => {
        if (!data) {
            return [];
        }
        return data.notes.filter((note) => JSON.stringify(note).toLowerCase().includes(search.trim().toLowerCase()));
    }, [data, isPending, search]);

    return (
        <>
            <div className={cn("grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pb-40", !isPending && (data == undefined || data?.notes.length == 0) && "pb-0")}>
                {/* Lading State */}
                <AnimatePresence>
                    {/*  */}
                    {isPending &&
                        Array.from({ length: 12 }).map((_, index) => (
                            <motion.div
                                //
                                key={index}
                                initial={{ opacity: 1 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 1 }}
                                children={<NoteElementShimmer />}
                            />
                        ))}
                </AnimatePresence>

                {/* Data State */}
                <AnimatePresence>
                    {notes.map((note) => (
                        <motion.div
                            //
                            key={note.id}
                            layout
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 1 }}
                            children={<NoteElement note={note} />}
                        />
                    ))}
                </AnimatePresence>
            </div>
            {/* No Data State */}
            {!isPending && (data == undefined || data?.notes.length == 0) && (noDataComponent || <NoData />)}
            {/* No Data For seearched State */}
            {!isPending && notes.length == 0 && data != undefined && search && <NoMatchingSearchedData search={search} />}
        </>
    );
});
