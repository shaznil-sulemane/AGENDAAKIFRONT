// src/pages/AdminPanel.tsx
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AdminPanel() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirecionar caso o usuário não seja admin
  useEffect(() => {
    if (!user || user.role !== "admin") {
      // navigate("/unauthorized");
    }
  }, [user, navigate]);

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-4">Painel do Administrador</h1>
      <p className="mb-6 text-muted-foreground">
        Aqui você pode gerenciar usuários, configurações do sistema e monitorar relatórios.
      </p>

      <div className="grid gap-4">
        <Button>Gerenciar Usuários</Button>
        <Button>Configurações do Sistema</Button>
        <Button>Relatórios</Button>
      </div>
    </div>
  );
}
