import { Card, CardContent } from "@/components/ui/card";
import { LoginForm } from "../components/login-form";
import loginIllustration from "@/assets/SVGs/secure-login.svg";
import { cn } from "@/lib/utils";

export default function LoginPage({ className, ...props }: React.ComponentProps<typeof Card>) {
    return (
        <>
            <Card className={cn("md:min-w-3xl overflow-hidden p-0", className)} {...props}>
                <CardContent className="grid p-0 md:grid-cols-5">
                    <LoginForm />
                    <div className="bg-muted relative hidden md:col-span-2 md:block">
                        <img src={loginIllustration} alt="Login Illustration" className="absolute p-6 inset-0 h-full w-full object-contain" />
                    </div>
                </CardContent>
            </Card>
            <div className="mt-4 text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                En vous connectant, vous acceptez nos <a href="#">Conditions d'utilisation</a> et <a href="#">Politique de confidentialité</a>.
            </div>
        </>
    );
}
