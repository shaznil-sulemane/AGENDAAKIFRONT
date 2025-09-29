import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function SignUpForm({ 
  className,
  ...props
} : React.ComponentProps<"form">) {
  const { createUser, createManager, companyId } = useAuth();
  const [role, setRole] = useState<"client" | "manager">("client");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");
  
  
  // Campos de manager
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== cpassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    setLoading(true);
    try {
      if (role === "client") {
        await createUser({
          email,
          password,
          username,
          fullname,
          gender,
          role: "client",
        });
      } else {
        await createManager({
          companyId,
          email,
          password,
          username,
          fullname,
          gender,
          role
        }
        );
      }
      toast.success("Conta criada com sucesso!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={handleSubmit}
        {...props}
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Crie sua conta</h1>

        <Tabs
          defaultValue="client"
          className="w-full mb-6"
          onValueChange={(value) => setRole(value as "client" | "manager")}
        >
          <TabsList className="gap-2">
            <TabsTrigger value="client">
              <span color="#ffffff">Usuário</span>
            </TabsTrigger>
            <TabsTrigger value="manager">Manager</TabsTrigger>
          </TabsList>

          <TabsContent value="client">
            <div className="grid gap-4">
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
                  onChange={(e) => setGender(e.target.value as "MALE" | "FEMALE")}
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
          </TabsContent>

          <TabsContent value="manager">
            <div className="grid gap-4">
              {/* Campos básicos do user */}
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
                  onChange={(e) => setGender(e.target.value as "MALE" | "FEMALE")}
                  className="border border-border rounded-md p-2"
                >
                  <option value="MALE">Masculino</option>
                  <option value="FEMALE">Feminino</option>
                </select>
              </div>

              {/* Campos da empresa */}
              <div className="grid gap-1">
                <Label htmlFor="companyName">Nome da empresa</Label>
                <Input
                  id="companyName"
                  placeholder="Nome da empresa"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="country">País</Label>
                <Input
                  id="country"
                  placeholder="País"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  placeholder="Cidade"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="contact">Contato</Label>
                <Input
                  id="contact"
                  placeholder="Contato"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </div>

              {/* Campos de login */}
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
          </TabsContent>
        </Tabs>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Cadastrando..." : "Criar conta"}
        </Button>
      </form>
  );
}
