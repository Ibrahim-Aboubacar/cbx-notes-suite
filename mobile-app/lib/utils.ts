import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getInitials(fullName: string, all: boolean = false): string {
    if (!fullName.trim()) return "";

    const words = fullName.trim().split(/\s+/); // Split sur tous les espaces
    if (words.length === 1) return words[0][0].toUpperCase();

    const initials = all
        ? words.map(w => w[0].toUpperCase()).join("")
        : words.slice(0, 2).map(w => w[0].toUpperCase()).join("");

    return initials;
}

export function rand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function minMaxOrValue(min: number, max: number, value: number): number {

    if (value < min) {
        return min
    }
    if (value > max) {
        return max
    }
    return value
    // return Math.max(min, Math.min(max, value));
}