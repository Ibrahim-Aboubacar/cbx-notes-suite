import useGetNotesQuery from "../query/getNotesQuery";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { DataPresentation } from "../components/DataPresentation";

export default function MyNotesPage() {
    const [search, setSearch] = useState("");
    const { data, isPending } = useGetNotesQuery({ type: "myNotes", searchQery: {} });
    return (
        <div>
            <PageHeader title="Mes Notes" search={search} onSearchChange={setSearch} searchDisabled={!data || data.notes.length == 0} />
            <DataPresentation isPending={isPending} data={data} search={search} />
        </div>
    );
}
