import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { api } from "@/lib/axios";
import { Link, useNavigate } from "react-router-dom";

export default function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { signup, checkAvailability } = useAuth();
  const [role, setRole] = useState<"client" | "manager">("client");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== cpassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    setLoading(true);
    try {
      // 1️⃣ Verifica username
      if (username) {
        const resUsername = await checkAvailability("username", username);
        console.log(resUsername);

        if (!resUsername.data) {
          toast.error("Nome de usuário já está em uso.");
          setLoading(false);
          return;
        }
      }

      // 2️⃣ Verifica email
      if (email) {
        const resEmail = await checkAvailability("email", email);
        if (!resEmail.data) {
          toast.error("Email já está em uso.");
          setLoading(false);
          return;
        }
      }

      // 3️⃣ Verifica telefone
      if (phone) {
        const resPhone = await checkAvailability("phone", phone);
        if (!resPhone.data) {
          toast.error("Telefone já está em uso.");
          setLoading(false);
          return;
        }
      }

      // 4️⃣ Cria usuário
      if (role === "client") {
        await signup({
          email,
          password,
          username,
          fullname,
          phone,
          gender,
          role: "USER",
        });
      } else {
        await signup({
          email,
          password,
          username,
          fullname,
          phone,
          gender,
          role: "MANAGER",
        });
      }

      toast.success("Conta criada com sucesso!");
      navigate('/login', { replace: true })
    } catch (error: any) {
      toast.error(error?.message || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Crie sua conta
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <form
          className={cn("flex flex-col gap-6", className)}
          onSubmit={handleSubmit}
          {...props}
        >
          {/* Toggle entre Client e Manager */}
          <div className="flex gap-2 justify-center">
            <Button
              type="button"
              variant={role === "client" ? "default" : "outline"}
              onClick={() => setRole("client")}
              className={`flex-1 ${role === "client" ?  "bg-green-500 text-white": ""}`}
            >
              Usuário
            </Button>
            <Button
              type="button"
              variant={role === "manager" ? "default" : "outline"}
              onClick={() => setRole("manager")}
              className={`flex-1 ${role === "manager" ?  "bg-green-500 text-white": ""}`}
            >
              Manager
            </Button>
          </div>

          {/* Campos comuns */}
          <div className="grid gap-4 pt-4">
            <div className="grid gap-1">
              <Label htmlFor="username">Nome de usuário</Label>
              <Input
                id="username"
                placeholder="Seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="fullname">Nome completo</Label>
              <Input
                id="fullname"
                placeholder="Seu nome completo"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="gender">Gênero</Label>
              <select
                id="gender"
                value={gender}
                onChange={(e) =>
                  setGender(e.target.value as "MALE" | "FEMALE")
                }
                className="border border-border rounded-md p-2"
              >
                <option value="MALE">Masculino</option>
                <option value="FEMALE">Feminino</option>
              </select>
            </div>
            <div className="grid gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(+258) 84 000 0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="cpassword">Confirmar senha</Label>
              <Input
                id="cpassword"
                type="password"
                placeholder="Confirme sua senha"
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-green-500" disabled={loading}>
            {loading ? "Cadastrando..." : "Criar conta"}
          </Button>
        </form>
        
      <div className="text-right text-sm dark:text-white">
        Já uma conta?{" "}
        <Link to={"/login"}>Entrar</Link>
      </div>
      </CardContent>
    </Card>
  );
}
