import useGetNotesQuery from "../query/getNotesQuery";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { DataPresentation } from "../components/DataPresentation";
import { NoPublicData } from "../components/NoData";

export default function PublicNotesPage() {
    const [search, setSearch] = useState("");
    const { data, isPending } = useGetNotesQuery({ type: "public", searchQery: {} });
    return (
        <div>
            <PageHeader title="Notes publiques" search={search} onSearchChange={setSearch} searchDisabled={!data || data.notes.length == 0} />
            <DataPresentation isPending={isPending} data={data} search={search} noDataComponent={<NoPublicData />} />
        </div>
    );
}
