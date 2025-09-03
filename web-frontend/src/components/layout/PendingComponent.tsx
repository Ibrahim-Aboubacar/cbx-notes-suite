import { Loader2 } from "lucide-react";

export const PendingComponent = () => {
    return (
        <div className="fixed bg-teal-50 inset-0 flex items-center justify-center z-50">
            <Loader2 className="text-teal-900 animate-spin size-10" />
        </div>
    );
};
