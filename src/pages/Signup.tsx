import { CalendarDays } from "lucide-react"; // Ícone do Agendaki
import { ModeToggle } from "@/components/mode-toggle";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import SignUpForm from "@/components/signup-form";

export default function SignupPage() {
  // const { user } = useAuth();
  const navigate = useNavigate();

  // Redireciona usuário logado para dashboard
  // useEffect(() => {
  //   if (user) {
  //     if (user.role === "admin") navigate("/dashboard/admin");
  //     else if (user.role === "manager") navigate("/dashboard/manager");
  //     else navigate("/dashboard/client");
  //   }
  // }, [user, navigate]);

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Lado do formulário */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* Cabeçalho */}
        <div className="flex w-full justify-between items-center gap-2">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md bg-green-500">
              <CalendarDays className="h-4 w-4" />
            </div>
            Agendaki
          </a>
          <ModeToggle />
        </div>

        {/* Formulário */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xl">
            <SignUpForm />
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
