import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToggle } from "react-use";
import useOtpTokenStore from "../../store/otpTokenStore";
import useLogin from "../query/LoginQuery";
import { Link, useNavigate } from "@tanstack/react-router";
import type z from "zod";
import useLoginForm from "../form/LoginForm";
import { ToastService } from "@/services/toastService/toastService";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getUserQueryOpions } from "../../hooks/useUser";

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
    const queryClient = useQueryClient();
    const [isLoading, toggleLoading] = useToggle(false);
    const { setData } = useOtpTokenStore();
    const { mutateAsync } = useLogin();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        formSchema,
    } = useLoginForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });
    type formType = z.infer<typeof formSchema>;

    const onSubmit = useCallback(
        (data: formType) => {
            toggleLoading(true);
            mutateAsync(data)
                .then(async (res) => {
                    if (res.success && res.data?.accessToken && res.data?.user) {
                        setData({
                            token: res.data.accessToken,
                            user: res.data.user,
                        });
                        await queryClient.prefetchQuery(getUserQueryOpions());

                        setTimeout(() => {
                            ToastService.success({
                                title: "Connexion reussite!",
                                description: "Bon retour " + res.data.user.pseudo,
                            });
                        }, 300);

                        navigate({
                            to: "/notes",
                        });
                    } else {
                        ToastService.error({
                            title: "Une erreur est survenue",
                            description: res.message,
                        });
                    }
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
        },
        [setData, navigate],
    );
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cn("p-6 md:p-8 md:col-span-3", className)} {...props}>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Bienvenue sur CoNote</h1>
                    <p className="text-muted-foreground text-balance">Connectez-vous pour commencer</p>
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
                    Se connecter
                </Button>
                <div className="text-center text-sm">
                    Pas de compte?{" "}
                    <Link to={"/register"} className="underline underline-offset-4">
                        S'inscrire
                    </Link>
                </div>
            </div>
        </form>
    );
}
