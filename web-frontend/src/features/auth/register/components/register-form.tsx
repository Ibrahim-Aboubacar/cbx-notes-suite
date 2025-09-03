import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToggle } from "react-use";
import useOtpTokenStore from "../../store/otpTokenStore";
import useRegister from "../query/RegisterQuery";
import { Link, useNavigate } from "@tanstack/react-router";
import type z from "zod";
import { ToastService } from "@/services/toastService/toastService";
import useRegisterForm from "../form/RegisterForm";

export function RegisterForm({ className, ...props }: React.ComponentProps<"form">) {
    const [isLoading, toggleLoading] = useToggle(false);
    const { setData } = useOtpTokenStore();
    const { mutateAsync } = useRegister();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        formSchema,
    } = useRegisterForm({
        defaultValues: {
            email: "",
            password: "",
            username: "",
        },
    });
    type formType = z.infer<typeof formSchema>;

    function onSubmit(data: formType) {
        toggleLoading(true);
        mutateAsync(data)
            .then((res) => {
                setData({
                    token: res.accessToken,
                });

                setTimeout(() => {
                    ToastService.success({
                        title: "Inscription reussite",
                        description: "Bienvenue sur CoNote",
                    });
                }, 400);

                navigate({
                    to: "/notes",
                });
            })
            .catch(() => {
                ToastService.error({
                    title: "Une erreur est survenue",
                    description: "Veuillez vérifier vos identifiants",
                });
            })
            .finally(() => {
                toggleLoading(false);
            });
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cn("p-6 md:p-8 md:col-span-3", className)} {...props}>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Bienvenue sur CoNote</h1>
                    <p className="text-muted-foreground text-balance">Inscrivez-vous pour commencer</p>
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="username">Pseudo</Label>
                    <Input id="username" type="text" {...register("username")} placeholder="john.doe" error={errors.username} required />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...register("email")} placeholder="john.doe@example.com" error={errors.email} required />
                </div>
                <div className="grid gap-3">
                    <div className="flex items-center">
                        <Label htmlFor="password">Mot de passe</Label>
                    </div>
                    <Input id="password" type="password" {...register("password")} placeholder="********" error={errors.password} required />
                </div>
                <Button isPending={isLoading} type="submit" className="w-full">
                    S'inscrire
                </Button>
                <div className="text-center text-sm">
                    Déjà un compte?{" "}
                    <Link to={"/login"} className="underline underline-offset-4">
                        Se connecter
                    </Link>
                </div>
            </div>
        </form>
    );
}
