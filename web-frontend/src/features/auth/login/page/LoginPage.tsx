import Header from "../../components/header";
import useLoginHook from "../hook/loginHook";
import Form from "../components/Loginform";

export default function LoginPage() {
    useLoginHook();

    return (
        <div className="h-full w-full flex items-center p-4">
            <div className="w-full max-w-sm mx-auto">
                <Header title={"Bienvenue sur CoNote"} description={"Connectez-vous pour commencer"} />

                <Form />
            </div>
        </div>
    );
}
