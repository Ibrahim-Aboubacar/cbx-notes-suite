import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ClassValue } from "clsx";

/**
 * Merge class names
 *
 * @param inputs Array of class names
 * @returns String: Merged class names
 */
export function cn(...inputs: Array<ClassValue>) {
    return twMerge(clsx(inputs));
}