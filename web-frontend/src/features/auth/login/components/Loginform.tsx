import { useToggle } from "react-use";
import { useNavigate } from "@tanstack/react-router";
import useLoginForm from "../form/LoginForm";
import useLogin from "../query/LoginQuery";
import type z from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useOtpTokenStore from "@/features/auth/store/otpTokenStore";

export default function Form() {
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
            username: "",
            password: "",
        },
    });
    type formType = z.infer<typeof formSchema>;

    function onSubmit(data: formType) {
        toggleLoading(true);
        mutateAsync(data)
            .then((res) => {
                const fiveMinutes = 5 * 60 * 1000;
                setData({
                    token: res.otpToken,
                    username: data.username,
                    expireAt: new Date(Date.now() + fiveMinutes),
                });
                navigate({
                    to: "/verify-otp",
                });
            })
            .catch((err) => {
                console.log({ err });
            })
            .finally(() => {
                toggleLoading(false);
            });
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 flex flex-col gap-4 items-center">
            <div className="grid w-full items-center gap-3 pb-1">
                <Label htmlFor="username">Email</Label>
                <Input placeholder={"john.doe@exemple.com"} id="username" {...register("username")} error={errors.username} />
            </div>
            <div className="grid w-full items-center gap-3 pb-1">
                <Label htmlFor="password">Mot de passe</Label>
                <Input placeholder={"Votre mot de passe"} id="password" type="password" {...register("password")} error={errors.password} />
            </div>
            
            <Button type="submit" className="w-full  mt-5" isPending={isLoading}>
                Se Connecter
            </Button>
        </form>
    );
}

