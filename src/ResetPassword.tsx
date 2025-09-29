"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

export default function ResetPasswordPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== cpassword) {
            toast.error("As senhas não coincidem");
            return;
        }


        setLoading(true);

        setTimeout(() => {
            try {
                // chamada para backend: redefinir senha com token/código
                toast.success("Senha alterada com sucesso!");

                navigate("/login")
            } catch (err) {
                toast.error("Erro ao redefinir senha");
            } finally {
                setLoading(false);
            }
        }, 3000);
    };



    // Pegar token da query string
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const t = params.get("token");
        const c = params.get("code");
        if (!t || !c) {
            toast.error("Token inválido ou código");
            navigate("/login");
            return;
        }
    }, [location.search]);

    return (
        <div className="flex flex-1 h-full justify-center items-center">
            <Card className="w-full max-w-md mx-auto shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">
                        Redefinir senha
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4" onSubmit={handleReset}>
                        <div className="grid gap-1">
                            <Label htmlFor="password">Nova senha</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Digite a nova senha"
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
                                placeholder="Confirme a nova senha"
                                value={cpassword}
                                onChange={(e) => setCPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader className="animate-spin" size={40}/>}
                            {loading ? "Salvando..." : "Redefinir senha"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
