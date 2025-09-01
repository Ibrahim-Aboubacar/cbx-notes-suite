import logo from "@/assets/images/logo.png";

export default function AppLogo() {
    return (
        <div className="inline-flex items-center gap-2">
            <img src={logo} className="size-8" />
            <span className="font-bold text-xl text-teal-600">CoNote</span>
        </div>
    );
}
