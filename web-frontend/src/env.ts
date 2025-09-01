import { z } from "zod";

const envSchema = z.object({
    VITE_API_URL: z.string().url(),
    VITE_ENVIRONMENT: z.enum(["dev", "prod", "stage"]),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
    console.error("❌ Invalid environment variables", parsed.error.format());
    throw new Error("Invalid environment variables");
}

const raw = parsed.data;

export const env = {
    api_url: raw.VITE_API_URL,
    environment: raw.VITE_ENVIRONMENT,
    isProd: raw.VITE_ENVIRONMENT !== "dev" && raw.VITE_ENVIRONMENT !== "stage",
    isDev: raw.VITE_ENVIRONMENT === "dev",
    isStage: raw.VITE_ENVIRONMENT === "stage",
};
