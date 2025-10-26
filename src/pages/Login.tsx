import { CalendarDays } from "lucide-react";
import { LoginForm } from "@/components/login-form";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";

export default function LoginPage() {
    const [searchParams] = useSearchParams();
    const { auth, user, setAuth, setUser } = useAuth();
    const navigate = useNavigate();

    const next = searchParams.get("next") || "/";

    // Se o backend redirecionar de volta para /login?token=XYZ (pós-OAuth)
    useEffect(() => {
        const token = searchParams.get("token");
        if (token) {
            localStorage.setItem("access_token", token);

            fetch("http://localhost:8080/user", {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(res => res.json())
                .then(userData => {
                    setUser(userData);
                    setAuth(true);
                    toast.success("Login com Google realizado!");
                    navigate("/dashboard/client");
                })
                .catch(() => toast.error("Erro ao buscar dados do usuário"));
        }
    }, []);

    const onFinish = () => {
        console.log("LoginPage: onFinish chamado");

        if (next && next !== "/") {
            toast.success("Usuário logado com sucesso. Redirecionando...");
            navigate(next, { replace: true });
            return;
        }

        if (auth && user) {
            toast.success("Usuário logado com sucesso.");
            if (user.role === "ADMIN") navigate("/dashboard/admin");
            else if (user.role === "MANAGER") navigate("/dashboard/manager");
            else if (user.role === "STAFF") navigate("/dashboard/staff");
            else navigate("/dashboard/client");
        }
    };

    // 👉 login Google
    const loginWithGoogle = () => {
        window.location.href = "http://localhost:4000/oauth2/authorization/google";
    };

    return (
        <div className="grid min-h-screen bg-[#ffffff] dark:bg-gradient-to-br from-[#00c951] to-[#00913a] lg:grid-cols-2">
            {/* Lado do formulário */}
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex w-full justify-between items-center gap-2">
                    <a href="#" className="flex items-center gap-2 font-semibold dark:text-white text-2xl">
                        <div className="text-primary-foreground flex h-10 w-10 p-2 items-center justify-center rounded-2xl bg-[#00c951] dark:bg-white">
                            <CalendarDays className="h-8 w-8 dark:text-[#00c951]" />
                        </div>
                        AgendAki
                    </a>
                    <ModeToggle />
                </div>

                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-md flex flex-col gap-6">
                        <LoginForm onFinish={onFinish} />

                        {/* Login com Google */}
                        <button
                            onClick={loginWithGoogle}
                            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-100 transition"
                        >
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5" />
                            Entrar com Google
                        </button>
                    </div>
                </div>
            </div>

            {/* Imagem lateral */}
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
