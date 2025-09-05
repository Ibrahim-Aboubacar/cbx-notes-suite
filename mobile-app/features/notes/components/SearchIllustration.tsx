import searchIllustration from "@/assets/SVGs/search.svg";
import { cn } from "@/lib/utils";
import { memo, type ComponentProps } from "react";
import { motion } from "framer-motion";

const SearchIllustration = memo(({ className, ...props }: Omit<ComponentProps<typeof motion.img>, "src">) => {
    return (
        <motion.img
            //
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            src={searchIllustration}
            className={cn("w-full max-w-[18rem]", className)}
            alt="Illustration notes vides"
            {...props}
        />
    );
});

export default SearchIllustration;
