import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    email: z.string().email('Email est invalide!'),
    password: z.string().min(8, 'Mot de passe doit contenir au moins 8 caracteres!'),
});

type formType = z.infer<typeof formSchema>;

export default function useLoginForm({ defaultValues }: { defaultValues?: Partial<formType> }) {
    const devDefault = { email: 'cisse@gmail.com', password: 'password' };

    const form = useForm<formType>({
        resolver: zodResolver(formSchema),
        defaultValues: { ...defaultValues, ...devDefault },
    });

    return { ...form, formSchema };
}
