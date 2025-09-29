import { CalendarDays } from "lucide-react"; // Ícone do Agendaki
import { LoginForm } from "@/components/login-form";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export default function LoginPage() {
    const [searchParams] = useSearchParams();
    const { auth, user } = useAuth();
    const navigate = useNavigate();

    const next = searchParams.get("next") || "/"; // se não tiver next, manda para "/"


    const onFinish = () => {
        console.log("LoginPage: onFinish chamado");

        if (next && next !== "/") {
            toast.success("Usuário logado com sucesso. Redirecionando...");
            navigate(next, { replace: true });
            return;
        }

        if (auth && user) {
            toast.success("Usuário logado com sucesso.")
            if (user.role === "ADMIN") navigate("/dashboard/admin");
            else if (user.role === "MANAGER") navigate("/dashboard/manager");
            else if (user.role === "STAFF") navigate("/dashboard/staff");
            else navigate("/dashboard/client");
        }
    };

    return (
        <div className="grid min-h-screen bg-[#ffffff] dark:bg-gradient-to-br from-[#00c951] to-[#00913a] lg:grid-cols-2">
            {/* Lado do formulário */}
            <div className="flex flex-col gap-4 p-6 md:p-10">
                {/* Cabeçalho */}
                <div className="flex w-full justify-between items-center gap-2">
                    <a href="#" className="flex items-center gap-2 font-semibold dark:text-white text-2xl">
                        <div className="text-primary-foreground flex h-10 w-10 p-2 items-center justify-center rounded-2xl bg-[#00c951] dark:bg-white">
                            <CalendarDays className="h-8 w-8 dark:text-[#00c951]" />
                        </div>
                        AgendAki
                    </a>
                    <ModeToggle />
                </div>

                {/* Formulário */}
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-md">
                        <LoginForm onFinish={onFinish} />
                    </div>
                </div>
            </div>

            {/* Lado da imagem */}
            <div className="bg-muted relative hidden lg:block">
                <img
                    src="/placeholder.png"
                    alt="Agendaki image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
}
