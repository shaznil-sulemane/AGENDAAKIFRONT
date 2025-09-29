"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

export default function MobileBookings() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const upcomingBookings = [
    { id: 1, service: "Corte Masculino", date: "15 Nov 2023", time: "15:30", professional: "João Silva", status: "confirmed", address: "Rua das Flores, 123 - Centro", price: 35.0, duration: "40 min" },
    { id: 2, service: "Barba Tradicional", date: "17 Nov 2023", time: "10:00", professional: "Pedro Costa", status: "confirmed", address: "Rua das Flores, 123 - Centro", price: 25.0, duration: "30 min" },
    { id: 3, service: "Manicure", date: "20 Nov 2023", time: "14:00", professional: "Ana Santos", status: "pending", address: "Rua das Flores, 123 - Centro", price: 30.0, duration: "45 min" },
  ];

  const pastBookings = [
    { id: 4, service: "Corte Feminino", date: "10 Nov 2023", time: "16:30", professional: "Carla Silva", status: "completed", address: "Rua das Flores, 123 - Centro", price: 45.0, duration: "60 min", rating: 5 },
    { id: 5, service: "Pedicure", date: "5 Nov 2023", time: "11:00", professional: "Maria Oliveira", status: "completed", address: "Rua das Flores, 123 - Centro", price: 35.0, duration: "50 min", rating: 4 },
    { id: 6, service: "Sobrancelha", date: "1 Nov 2023", time: "09:30", professional: "Carla Mendes", status: "cancelled", address: "Rua das Flores, 123 - Centro", price: 15.0, duration: "20 min" },
  ];

  const filterBookings = (bookings: any[]) =>
    bookings.filter(
      (booking) =>
        (booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.professional.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === "all" || booking.status === statusFilter)
    );

  const filteredUpcoming = filterBookings(upcomingBookings);
  const filteredPast = filterBookings(pastBookings);
  const bookings = activeTab === "upcoming" ? filteredUpcoming : filteredPast;

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { label: "Confirmado", variant: "default" as const },
      pending: { label: "Pendente", variant: "secondary" as const },
      completed: { label: "Concluído", variant: "outline" as const },
      cancelled: { label: "Cancelado", variant: "destructive" as const },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, variant: "outline" as const };
    return <Badge variant={config.variant} className="text-xs">{config.label}</Badge>;
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <div className="p-4 space-y-4 max-w-[1400px] mx-auto w-full">
      <h1 className="text-3xl font-bold text-gray-900">Meus Agendamentos</h1>

      {/* Abas com Material Design */}
      <div className="flex bg-gray-100 rounded-lg overflow-hidden shadow-sm">
        {["upcoming", "past"].map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-3 text-center font-medium transition-all duration-200
              ${activeTab === tab ? "bg-[#00c951] text-white shadow-md" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
            onClick={() => setActiveTab(tab as "upcoming" | "past")}
          >
            {tab === "upcoming" ? "Próximos" : "Passados"}
          </button>
        ))}
      </div>

      {/* Filtros com Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar agendamentos..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full">
            <Filter className="h-4 w-4 mr-2" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="confirmed">Confirmados</SelectItem>
            <SelectItem value="pending">Pendentes</SelectItem>
            <SelectItem value="completed">Concluídos</SelectItem>
            <SelectItem value="cancelled">Cancelados</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Contador */}
      <div className="text-sm text-gray-500">{bookings.length} agendamento{bookings.length !== 1 ? "s" : ""}</div>

      {/* Grid de agendamentos estilo Material */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 min-w-[1100px]:grid-col-2 gap-6">
        {bookings.map((booking) => (
          <Card key={booking.id} className="hover:shadow-xl transition-shadow rounded-lg overflow-hidden">
            <CardContent className="flex flex-col justify-between gap-3 p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg text-gray-900">{booking.service}</h3>
                {getStatusBadge(booking.status)}
              </div>

              <div className="space-y-1 text-gray-600 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> {booking.date}
                  <Clock className="w-4 h-4 ml-2" /> {booking.time}
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" /> {booking.professional}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {booking.address}
                </div>
                <div className="flex justify-between mt-2 items-center">
                  <span className="font-semibold">{formatCurrency(booking.price)}</span>
                  {booking.rating && (
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-sm ${i < booking.rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Ações */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
                {activeTab === "upcoming" ? (
                  booking.status === "pending" ? (
                    <>
                      <Button variant="default">Confirmar</Button>
                      <Button variant="outline">Reagendar</Button>
                      <Button variant="destructive">Cancelar</Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline">Reagendar</Button>
                      <Button variant="destructive">Cancelar</Button>
                      <Button>Ver detalhes</Button>
                    </>
                  )
                ) : (
                  <>
                    {!booking.rating && booking.status === "completed" && <Button variant="outline">Avaliar serviço</Button>}
                    <Button variant="outline">Ver detalhes</Button>
                    <Button variant="outline">Agendar novamente</Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Nenhum agendamento */}
      {bookings.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-medium mb-2">{activeTab === "upcoming" ? "Nenhum agendamento futuro" : "Nenhum agendamento passado"}</h3>
          <p className="text-sm mb-4">{activeTab === "upcoming" ? "Você ainda não possui agendamentos futuros." : "Seu histórico de agendamentos aparecerá aqui."}</p>
          {activeTab === "upcoming" && <Button>Agendar agora</Button>}
        </div>
      )}
    </div>
  );
}
