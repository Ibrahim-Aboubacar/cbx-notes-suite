import useUser from "@/features/auth/hooks/useUser";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/notes/")({
    component: RouteComponent,
});

function RouteComponent() {
    const { data } = useUser();
    return (
        <div>
            Hello "/_app/notes/"!
            <br />
            <br />
            <br />
            {JSON.stringify(data.data)}
        </div>
    );
}
