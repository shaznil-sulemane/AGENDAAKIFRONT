import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

export function LoginForm({
  onFinish,
  className,
  ...props
}: React.ComponentProps<"form"> & { onFinish: () => void } ) {
  const { login, getUser } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
      await login(identifier, password)
        .catch((err) => {
          toast.error(err.message || "Erro ao fazer login.")
        })
        .then(async () => {
          toast.success(`Bem-vindo de volta, ${getUser()?.fullName.split(" ")[0]}!`, { duration: 3000, position: "top-left" });
        })
        .finally(() => {
          onFinish();
          setLoading(false);

        })
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      {/* Cabeçalho */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold dark:text-white">Bem-vindo ao AgendAki</h1>
        <p className="text-muted-foreground text-sm dark:text-neutral-100">
          Entre com seu email para acessar sua conta
        </p>
      </div>

      {/* Campos */}
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label className="dark:text-white" htmlFor="identifier">Identificador</Label>
          <Input
            id="identifier"
            type="text"
            placeholder="seu@email.com ou telefone ou usuário"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label className="dark:text-white" htmlFor="password">Senha</Label>
            <Link to={"/forgot-password"}
              className="ml-auto text-sm underline-offset-4 hover:underline dark:text-white"
            >
              Esqueceu a senha?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full bg-[#00c951] dark:text-[#00c951] dark:bg-white" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              <p>Carregando...</p>
            </>
          )
            : "Entrar"}
        </Button>
      </div>

      {/* Link para cadastro */}
      <div className="text-right text-sm dark:text-white">
        Não possui uma conta?{" "}
        <Link to={"/signup"}>Cadastre-se</Link>
      </div>
    </form>
  );
}
