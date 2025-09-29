"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, Wallet, Banknote } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function PaymentMethods() {
    const [method, setMethod] = useState<string | null>(null);
    const [saveMethod, setSaveMethod] = useState(false);

    return (
        <div className="p-6 max-w-lg mx-auto space-y-6">
            {/* Cabeçalho */}
            <h1 className="text-xl font-bold text-gray-800">Escolha o método de pagamento</h1>
            <p className="text-sm text-gray-500">
                Selecione a forma de pagamento para confirmar sua marcação.
            </p>

            {/* Métodos */}
            <Card className="shadow-md border-0">
                <CardHeader>
                    <CardTitle className="text-gray-700">Métodos disponíveis</CardTitle>
                </CardHeader>
                <CardContent>
                    <RadioGroup value={method || ""} onValueChange={setMethod} className="space-y-4">
                        {/* Cartão */}
                        <div className="flex items-center space-x-3 rounded-xl border p-3 hover:shadow cursor-pointer transition">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex items-center space-x-2 cursor-pointer">
                                <CreditCard className="w-5 h-5 text-blue-600" />
                                <span>Cartão de Crédito/Débito</span>
                            </Label>
                        </div>

                        {/* Carteira Digital */}
                        <div className="flex items-center space-x-3 rounded-xl border p-3 hover:shadow cursor-pointer transition">
                            <RadioGroupItem value="wallet-medx" id="wallet" />
                            <Label htmlFor="wallet" className="flex items-center space-x-2 cursor-pointer">
                                <Wallet className="w-5 h-5 text-blue-600" />
                                <span>Carteira Digital MEDx</span>
                            </Label>
                        </div>

                        {/* Carteira Digital */}
                        <div className="flex items-center space-x-3 rounded-xl border p-3 hover:shadow cursor-pointer transition">
                            <RadioGroupItem value="wallet-mpesa" id="wallet" />
                            <Label htmlFor="wallet" className="flex items-center space-x-2 cursor-pointer">
                                <Wallet className="w-5 h-5 text-blue-600" />
                                <span>Carteira Digital M-Pesa</span>
                            </Label>
                        </div>

                        {/* Dinheiro */}
                        <div className="flex items-center space-x-3 rounded-xl border p-3 hover:shadow cursor-pointer transition">
                            <RadioGroupItem value="cash" id="cash" />
                            <Label htmlFor="cash" className="flex items-center space-x-2 cursor-pointer">
                                <Banknote className="w-5 h-5 text-green-600" />
                                <span>Dinheiro no Local</span>
                            </Label>
                        </div>
                    </RadioGroup>

                    {/* Salvar método */}
                    {method && (
                        <div className="flex items-center space-x-2 mt-4">
                            <Checkbox
                                id="saveMethod"
                                checked={saveMethod}
                                onCheckedChange={(val) => setSaveMethod(!!val)}
                            />
                            <Label htmlFor="saveMethod" className="text-sm text-gray-600 cursor-pointer">
                                Salvar este método para próximas marcações
                            </Label>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Botão confirmar */}
            <Button
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md hover:opacity-90 transition rounded-xl"
                disabled={!method}
            >
                Confirmar Pagamento
            </Button>
        </div>
    );
}
