import type { ComponentProps } from "react";
import type { FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";

function Input({ className, type, error, ...props }: ComponentProps<"input"> & { error?: FieldError }) {
    return (
        <div
            className={cn(
                "relative w-full",
                // Styles pour le message d'erreur avec after
                "after:absolute after:top-full after:left-0 after:-mt-0.5 after:text-xs after:text-destructive after:opacity-0 after:transition-all after:duration-300",
                error && "after:content-[var(--hook-form-error-message)] after:mt-0.5 after:opacity-100",
            )}
            style={{
                ["--hook-form-error-message" as string]: `"${error?.message || ""}"`,
            }}
        >
            <input
                type={type}
                data-slot="input"
                aria-invalid={!!error}
                className={cn(
                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
                    "dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs",
                    "transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm",
                    "file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                    className,
                )}
                {...props}
            />
        </div>
    );
}

export { Input };
