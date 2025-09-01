import logo from "@/assets/images/logo.png";

export default function Header({ title, description }: { title: string; description: string }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-center">
                <img src={logo} className="size-20 object-cover" alt="logo" />
            </div>
            <h1 className="text-xl font-bold text-center">{title}</h1>
            <p className="text-center ">{description}</p>
        </div>
    );
}
