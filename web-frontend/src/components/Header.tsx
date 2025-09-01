import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export default function Header() {
    const { t, i18n } = useTranslation();
    const changeLang = (lng: "en" | "fr") => i18n.changeLanguage(lng);

    return (
        <header className="p-2 flex gap-2 bg-white text-black justify-between">
            <nav className="flex flex-row">
                <div className="px-2 font-bold">
                    <Link to="/">Home</Link>
                </div>

                <div className="px-2 font-bold">
                    <Link to="/demo/tanstack-query">TanStack Query</Link>
                </div>

                <div className="px-2 font-bold">
                    <Link to="/contact">Contact</Link>
                </div>

                <div className="px-2 font-bold">
                    <Link to="/dashboard">Dashboard</Link>
                </div>
            </nav>
            <div className="p-4 space-y-4">
                <h1 className="text-2xl font-bold">{t("welcome")}</h1>
                <p>{t("greeting")}</p>

                <div className="flex gap-2">
                    <button onClick={() => changeLang("fr")} className="p-3 rounded bg-indigo-500 text-indigo-100">
                        🇫🇷 Français
                    </button>
                    <button onClick={() => changeLang("en")} className="p-3 rounded bg-indigo-500 text-indigo-100">
                        🇺🇸 English
                    </button>
                </div>
            </div>
        </header>
    );
}
