import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import notFoundIllustration from "@/assets/SVGs/404-illustration.svg"; // tu peux mettre ton SVG d'illustration
import { Link } from "@tanstack/react-router";
export default function NoteNotFoundComponent() {
    return (
        <div className="min-h-[calc(100%)] bg-gradient-to-t from-teal-100/70 to-white flex flex-col items-center justify-center text-center px-6">
            <motion.img
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                //
                src={notFoundIllustration}
                alt="Illustration page non trouvée"
                className="w-full max-w-md -mt-20"
            />
            <motion.div
                //
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 my-4">Oups ! Note non trouvée</h2>
                <p className="text-gray-600 mb-8">
                    La note que vous cherchez n'existe pas ou a expiré.
                    <br />
                    Vous pouvez retourner à l'accueil pour continuer votre exploration.
                </p>

                <Button size="lg" className="px-0 py-0">
                    <Link to={"/"} className="px-4 py-2 flex items-center gap-1">
                        <ArrowLeft className="size-5" /> Retour à l'accueil
                    </Link>
                </Button>
            </motion.div>
        </div>
    );
}
