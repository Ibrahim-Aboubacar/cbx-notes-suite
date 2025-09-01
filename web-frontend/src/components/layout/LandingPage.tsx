import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import noteIllustration from "@/assets/SVGs/open-notes.svg";
import logo from "@/assets/images/logo.png";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white flex flex-col">
            {/* Navbar */}
            <header className="w-full px-8 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <img src={logo} className="size-8" />
                    <span className="font-bold text-xl text-teal-600">CoNote</span>
                </div>
                <Button variant="default">Se connecter</Button>
            </header>

            {/* Hero Section */}
            <main className="flex-1 flex gap-4 items-center justify-center max-w-6xl mx-auto">
                <div className="flex gap-4 items-center justify-center text-center mx-10">
                    <div className="flex flex-col items-center justify-center text-center">
                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                            <span className="font-medium text-xl inline-block px-4 bg-teal-100 text-teal-600 border border-teal-300 rounded-2xl">Prenez des notes</span>
                            <br />
                            <span className="text-teal-600"> Collaborez</span> &<span className="text-teal-600"> Synchronisez</span> partout
                        </motion.h1>
                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="mt-4 max-w-2xl text-lg text-gray-600 text-balance">
                            CoNote est l'application de gestion de notes collaborative, sécurisée et multi-plateforme. Créez, organisez et partagez vos idées, en ligne ou hors ligne.
                        </motion.p>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="mt-8 flex flex-col sm:flex-row gap-4">
                            <Button size="lg">
                                <span className=" flex items-center gap-1">
                                    <span>Créer ma première note</span> <ArrowRight className="size-5" />
                                </span>
                            </Button>
                            <Button size="lg" variant="outline">
                                Se connecter
                            </Button>
                        </motion.div>
                    </div>
                    {/* Placeholder illustration */}
                    <motion.img src={noteIllustration} alt="Illustration prise de notes" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="hidden lg:block mt-12 w-full max-w-xl" />
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 text-center text-gray-500 text-sm">© {new Date().getFullYear()} CoNote. Tous droits réservés.</footer>
        </div>
    );
}
