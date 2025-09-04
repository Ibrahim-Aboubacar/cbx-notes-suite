import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDebounce } from "react-use";

export default function PageHeader({ title, search: _search, onSearchChange, searchDisabled }: { title: string; search: string; onSearchChange: (search: string) => void; searchDisabled?: boolean }) {
    const [search, setSearch] = useState(_search);

    useDebounce(() => onSearchChange(search), 500, [search]);

    return (
        <div className="h-18 flex items-center justify-between">
            <h1 className="text-2xl font-bold">{title}</h1>
            <div className="max-w-[20rem] grow">
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher" className="w-full" disabled={searchDisabled} />
            </div>
        </div>
    );
}
