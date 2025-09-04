import { memo } from "react";
import SearchIllustration from "./SearchIllustration";
import { motion } from "framer-motion";

export const NoMatchingSearchedData = memo(({ search }: { search?: string }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(60vh-12rem)]">
            <SearchIllustration />
            {/* Text */}
            <motion.p
                //
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center text-muted-foreground mt-3"
            >
                Aucune note ne correspond
                <br />à votre recherche
                <br />"<span className="font-semibold text-teal-600">{search?.trim()}</span>"
            </motion.p>
        </div>
    );
});
