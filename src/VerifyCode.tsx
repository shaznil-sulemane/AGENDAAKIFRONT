"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyCodePage() {
    const location = useLocation()
    const navigate = useNavigate()
    const [code, setCode] = useState<string>("");
    const [token, setToken] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const handleVerify = async ({e, val}:{e : React.FormEvent | null, val: string}) => {
        e ? e.preventDefault() : [];
        setLoading(true);

        try {

            if(val.length !== 6 || Number(val).toString() === "NaN") return toast.error("Codigo inválido") 
            // chamada para backend: validar código/token
            if(val != "123456") throw "Código inválido ou expirado";
            
            toast.success("Código verificado com sucesso!");
            
            // redirecionar para a página de nova senha
            navigate(`/reset-password?token=${token}&code=${code}`)
            return
        } catch (err) {
            toast.error("Código inválido ou expirado.");
        } finally {
            setLoading(false);
        }
    };

    // Pegar token da query string
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const t = params.get("token");
        const c = params.get("code");
        if (!t) {
            toast.error("Token inválido");
            navigate("/login");
            return;
        }
        if(c) setCode(c)
        setToken(t)
    }, [location.search]);


    return (
        <div className="flex flex-1 h-full justify-center items-center">
            <Card className="w-full max-w-md mx-auto shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">
                        Verificar código
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4 w-full items-center" onSubmit={(e) => handleVerify({e: e, val: code})}>
                        <div className="grid gap-4">
                            <Label htmlFor="code">Digite o código enviado ao seu email</Label>
                            <InputOTP maxLength={6} value={code} pattern={REGEXP_ONLY_DIGITS} onChange={(value) => {setCode(value); toast.info(value); value.length == 6 && handleVerify({e: null, val: value})}}>
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Verificando..." : "Verificar"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
