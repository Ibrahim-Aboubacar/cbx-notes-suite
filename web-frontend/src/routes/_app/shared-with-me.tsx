import { createFileRoute } from "@tanstack/react-router";
import emptyNotesIllustration from "@/assets/SVGs/empty-note.svg";

export const Route = createFileRoute("/_app/shared-with-me")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="h-full flex flex-col gap-4 justify-center items-center">
            <p className="text-2xl font-bold">Explore</p>
            <p className="text-muted-foreground">Explorez les notes partagées avec vous</p>
            <img src={emptyNotesIllustration} className="w-full max-w-[18rem]" alt="Illustration notes vides" />
            <p className="text-muted-foreground">Aucune note partagée avec vous</p>
        </div>
    );
}
