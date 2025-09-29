// src/pages/mobile/MobileDashboard.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, Clock, Scissors, User } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import React from "react";
import Autoplay from "embla-carousel-autoplay";

const services = [
    { id: 1, name: "Corte de Cabelo", img: `https://picsum.photos/300/200?random=1` },
    { id: 2, name: "Barba", img: `https://picsum.photos/300/200?random=2` },
    { id: 3, name: "Manicure", img: `https://picsum.photos/300/200?random=9` },
    { id: 4, name: "Pedicure", img: `https://picsum.photos/300/200?random=4` },
    { id: 5, name: "Tratamento Facial", img: `https://picsum.photos/300/200?random=5` },
    { id: 6, name: "Massagem", img: `https://picsum.photos/300/200?random=6` },
];

export default function MobileDashboard() {
    const navigate = useNavigate();
    const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

    // Dados mockados
    const upcomingAppointments = [
        { id: 1, service: "Corte de Cabelo", date: "Hoje, 15:30", professional: "João Silva" },
        { id: 2, service: "Barba", date: "Amanhã, 10:00", professional: "Carlos Souza" },
    ];

    const recommendedServices = [
        { id: 1, name: "Corte Social", duration: "45 min", price: "40,00 Mt", img: `https://picsum.photos/300/200?random=3` },
        { id: 2, name: "Sobrancelha", duration: "30 min", price: "20,00 Mt", img: `https://picsum.photos/300/200?random=4` },
        { id: 3, name: "Hidratação", duration: "60 min", price: "80,00 Mt", img: `https://picsum.photos/300/200?random=5` },
        { id: 4, name: "Lavagem", duration: "45 min", price: "880,00 Mt", img: `https://picsum.photos/300/200?random=6` },
    ];

    return (
    <div className="p-4 space-y-4 max-w-[1400px] mx-auto w-full">
            {/* Carrossel de serviços */}
            <Carousel
                plugins={[plugin.current]}
                className="w-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {services.map((service) => (
                        <CarouselItem key={service.id}>
                            <div
                                className="w-full h-60 sm:h-64 md:h-72 lg:h-80 rounded-xl overflow-hidden shadow-2xl bg-cover bg-center flex items-end"
                                style={{ backgroundImage: `url('${service.img}')` }}
                            >
                                <div className="w-full bg-black/60 p-4 text-center">
                                    <span className="text-white text-xl md:text-2xl font-semibold">{service.name}</span>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            {/* Agendamentos próximos */}
            <div className="w-full">
                <div className="flex justify-between items-center mb-4 w-full">
                    <h2 className="text-lg md:text-xl font-semibold text-[#00c951]">Próximos agendamentos</h2>
                    <Link to="/dashboard/bookings" className="text-sm md:text-base text-[#00c951]">Ver todos</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
                    {
                    upcomingAppointments.length > 0 ?
                            upcomingAppointments.map((appt) => (
                                <Card key={appt.id} className="transition-transform hover:scale-105">
                                    <CardContent className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 py-3 gap-3 md:gap-6">
                                        <div className="flex-1">
                                            <h3 className="font-medium text-sm md:text-base">{appt.service}</h3>
                                            <div className="flex items-center mt-1 text-xs md:text-sm text-muted-foreground">
                                                <Clock className="w-4 h-4 mr-1" />
                                                {appt.date}
                                            </div>
                                            <div className="flex items-center mt-1 text-xs md:text-sm">
                                                <User className="w-4 h-4 mr-1" />
                                                {appt.professional}
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm" className="mt-2 md:mt-0 min-w-[90px]">
                                            Detalhes
                                        </Button>
                                    </CardContent>
                                </Card>
                            )
                    ) : (
                        <Card>
                            <CardContent className="text-center p-4">
                                <p className="text-muted-foreground mb-3">Nenhum agendamento próximo</p>
                                <Link to="/dashboard/services">
                                    <Button>Agendar agora</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

            {/* Serviços recomendados */}
            <div>
                <h2 className="text-lg md:text-xl font-semibold mb-4 text-[#00c951]">Serviços em destaque</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                    {recommendedServices.map((service) => (
                        <Card key={service.id} className="overflow-hidden rounded-xl shadow-md hover:scale-105 transition-transform flex flex-col">
                            <div className="h-36 sm:h-40 md:h-44 lg:h-48 bg-cover bg-center" style={{ backgroundImage: `url('${service.img}')` }}></div>
                            <CardContent className="p-3 flex flex-col flex-1 justify-between">
                                <div>
                                    <h3 className="font-medium text-sm md:text-base">{service.name}</h3>
                                    <p className="text-xs md:text-sm text-muted-foreground">{service.duration}</p>
                                    <p className="text-sm md:text-base font-semibold mt-1">{service.price}</p>
                                </div>
                                <Button
                                    className="mt-3 w-full bg-[#00c951] hover:bg-[#00a843]"
                                    size="sm"
                                    onClick={() => navigate(`/dashboard/book/?id=${service.id}`)}
                                >
                                    Agendar
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Ações rápidas */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                <Link to="/dashboard/services">
                    <Card className="bg-[#00c951] text-primary-foreground text-center p-4 flex flex-col justify-center items-center">
                        <Scissors className="mx-auto h-6 w-6 mb-2" />
                        <span className="text-sm md:text-base font-medium text-white">Agendar Serviço</span>
                    </Card>
                </Link>
                <Link to="/dashboard/bookings">
                    <Card className="bg-white border-[#00c951] text-secondary-foreground text-center p-4 flex flex-col justify-center items-center">
                        <Calendar className="mx-auto h-6 w-6 mb-2 text-[#00c951]" />
                        <span className="text-sm md:text-base font-medium">Meus Agendamentos</span>
                    </Card>
                </Link>
            </div>
        </div>
    );
}
