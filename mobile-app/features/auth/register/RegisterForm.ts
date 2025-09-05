import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    pseudo: z.string().min(4, 'Le pseudo doit contenir au moins 4 caracteres!'),
    email: z.string().email('Email doit être valide!'),
    password: z.string().min(8, 'Mot de passe doit contenir au moins 8 caracteres!'),
})

type formType = z.infer<typeof formSchema>;

export default function useRegisterForm({ defaultValues }: { defaultValues?: Partial<formType> }) {

    const form = useForm<formType>({
        resolver: zodResolver(formSchema),
        defaultValues: { ...defaultValues },
    });

    return { ...form, formSchema };
}
