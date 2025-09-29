"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
// import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Calendar1, Timer, User } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, Wallet, Banknote } from "lucide-react";


const services = [
    {
        id: 1,
        name: "Corte Masculino",
        category: "hair",
        duration: "40 min",
        price: "35,00 Mt",
        rating: 4.8,
        professionals: ["João Silva", "Carlos Souza"],
        img: `https://picsum.photos/300/200?random=1`
    },
    {
        id: 2,
        name: "Barba Tradicional",
        category: "beard",
        duration: "30 min",
        price: "25,00 Mt",
        rating: 4.9,
        professionals: ["Pedro Costa"],
        img: `https://picsum.photos/300/200?random=8`
    },
    {
        id: 3,
        name: "Manicure",
        category: "nails",
        duration: "45 min",
        price: "30,00 Mt",
        rating: 4.7,
        professionals: ["Ana Santos", "Juliana Lima"],
        img: `https://picsum.photos/300/200?random=3`
    },
    {
        id: 4,
        name: "Pedicure",
        category: "nails",
        duration: "50 min",
        price: "350,00 Mt",
        rating: 4.6,
        professionals: ["Ana Santos", "Maria Oliveira"],
        img: `https://picsum.photos/300/200?random=4`
    },
    {
        id: 5,
        name: "Limpeza de Pele",
        category: "esthetics",
        duration: "60 min",
        price: "900,00 Mt",
        rating: 4.9,
        professionals: ["Carla Mendes"],
        img: `https://picsum.photos/300/200?random=5`
    },
];

// Lista fake de profissionais
const professionals = [
    { id: 1, name: "João Silva", role: "Cabeleireiro", image: "/avatar1.png" },
    { id: 2, name: "Maria Santos", role: "Manicure", image: "/avatar2.png" },
    { id: 3, name: "Carlos Pinto", role: "Barbeiro", image: "/avatar3.png" },
];

// Lista fake de horários disponíveis
const availableTimes = ["09:00", "09:30", "10:00", "11:00", "14:00", "15:30"];

export default function CustumerBook() {
    const location = useLocation()
    const navigate = useNavigate()
    const [method, setMethod] = useState<string | null>(null);
    const [selectedProfessional, setSelectedProfessional] = useState<number | null>(null);
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [time, setTime] = useState<string | null>(null);


    // Pegar token da query string
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const t = params.get("id");

        if (!t) {
            toast.error("Parametro 'id' não encontrado.");
            navigate("/dashboard/services");
            return;
        }

        if (!services.find(v => v.id.toString() !== t)) {
            toast.error("Serviço não encontrado.");
            navigate("/dashboard/services");
            return;
        }
    }, [location.search]);


    return (
        <div className="p-4 max-w-3xl mx-auto space-y-6">
            {/* Profissionais */}
            <Card>
                <CardHeader>
                    <CardTitle>Escolha o profissional</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-4">
                    {professionals.map((pro) => (
                        <div
                            key={pro.id}
                            onClick={() => setSelectedProfessional(pro.id)}
                            className={cn(
                                "cursor-pointer flex flex-col items-center p-3 rounded-2xl border hover:shadow-md transition",
                                selectedProfessional === pro.id ? "border-green-500 bg-green-50" : "border-gray-200"
                            )}
                        >
                            <Avatar className="w-16 h-16 mb-2">
                                <AvatarImage src={pro.image} alt={pro.name} />
                                <AvatarFallback className="text-green-500">{pro.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <p className="font-semibold">{pro.name}</p>
                            <p className="text-sm text-gray-500">{pro.role}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Calendário */}
            <Card>
                <CardHeader>
                    <CardTitle>Escolha a data</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        buttonVariant={"secondary"}
                        className="rounded-md border"
                    />
                </CardContent>
            </Card>

            {/* Horários */}
            <Card>
                <CardHeader>
                    <CardTitle>Escolha o horário</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {availableTimes.map((t) => (
                        <Button
                            key={t}
                            variant={time === t ? "default" : "outline"}
                            onClick={() => setTime(t)}
                            className="rounded-xl"
                        >
                            {t}
                        </Button>
                    ))}
                </CardContent>
            </Card>

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
                            <RadioGroupItem value="wallet" id="wallet" />
                            <Label htmlFor="wallet" className="flex items-center space-x-2 cursor-pointer">
                                <Wallet className="w-5 h-5 text-blue-600" />
                                <span>Carteira Digital (MEDx, M-Pesa, etc.)</span>
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
                </CardContent>
            </Card>

            {/* Resumo e confirmação */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100 shadow-lg border-0">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold text-gray-800">
                        Resumo da Marcação
                    </CardTitle>
                    <p className="text-sm text-gray-500">Revise os detalhes antes de confirmar</p>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <User />
                        <span className="font-medium text-gray-900">
                            {selectedProfessional
                                ? professionals.find((p) => p.id === selectedProfessional)?.name
                                : "Não selecionado"}
                        </span>
                    </div>

                    <div className="flex justify-between items-center border-b pb-2">
                        <Calendar1 />
                        <span className="font-medium text-gray-900">
                            {date ? date.toLocaleDateString("pt-PT") : "Não selecionada"}
                        </span>
                    </div>

                    <div className="flex justify-between items-center border-b pb-2">
                        <Timer />
                        <span className="font-medium text-gray-900">{time || "Não selecionada"}</span>
                    </div>

                    <Button
                        className="w-full mt-2 bg-gradient-to-r from-green-600 to-green-600 text-white shadow-md hover:opacity-90 transition rounded-xl"
                        disabled={!selectedProfessional || !date || !time || !method}
                        onClick={() => navigate("/dashboard/client/pay")}
                    >
                        Confirmar Marcação
                    </Button>
                </CardContent>
            </Card>

        </div>
    );
}
