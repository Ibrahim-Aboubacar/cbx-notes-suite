import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { t } from "@/integrations/i18n/i18n";
import { env } from "@/env";

const usernameRegex = /^([A-Z]{3})-([A-Z0-9]{8})-(0[1-9]|1[0-9]|2[0-6])$/;

const getUsernameZodSchema = (version: "v1" | "v2" = "v1") => {
    if (version === "v1") {
        return z.string().regex(usernameRegex, "Le nom d'utilisateur doit respecter le format: AAA-XXXXXXXX-XX (AAA en majuscules, 8 caractères alphanumériques, puis un nombre de 01 à 26)");
    }
    return z
        .string()
        .min(1, t("login.form.errors.username.required"))
        .refine((val) => /^.{15}$/.test(val), {
            message: t("login.form.errors.username.length"),
        })
        .refine((val) => /^([A-Z]{3})-([A-Z0-9]{8})-(0[1-9]|1[0-9]|2[0-6])$/.test(val), { message: t("login.form.errors.username.pattern") });
};

const formSchema = z.object({
    username: getUsernameZodSchema("v2"),
    password: z.string().min(8, t("login.form.errors.password")),
});

type formType = z.infer<typeof formSchema>;

export default function useLoginForm({ defaultValues }: { defaultValues?: Partial<formType> }) {
    const devDefault = env.isDev ? { username: "NER-13ZVRLPP-25", password: "12345678" } : {};
    const form = useForm<formType>({
        resolver: zodResolver(formSchema),
        defaultValues: { ...defaultValues, ...devDefault },
    });

    return { ...form, formSchema };
}
