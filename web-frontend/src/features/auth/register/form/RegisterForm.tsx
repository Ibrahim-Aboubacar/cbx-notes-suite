import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().email("L'email doit être valide"),
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    username: z.string().min(6, "Le pseudo doit contenir au moins 6 caractères"),
});

type formType = z.infer<typeof formSchema>;

export default function useRegisterForm({ defaultValues }: { defaultValues?: Partial<formType> }) {
    const form = useForm<formType>({
        resolver: zodResolver(formSchema),
        defaultValues: { ...defaultValues },
    });

    return { ...form, formSchema };
}
