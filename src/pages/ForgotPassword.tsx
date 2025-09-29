"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // chamada para backend: enviar código ou link de recuperação
            toast.success("Se este email estiver cadastrado, você receberá instruções.");
            navigate('/login')
        } catch (err) {
            toast.error("Erro ao processar pedido");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-1 h-full justify-center items-center">
            <Card className="w-full max-w-md mx-auto shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">
                        Recuperar senha
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="grid gap-1">
                            <Label htmlFor="email">Digite seu email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Enviando..." : "Enviar instruções"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
