// src/pages/mobile/MobileBookings.tsx
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
    {
      id: 1,
      service: "Corte Masculino",
      date: "15 Nov 2023",
      time: "15:30",
      professional: "João Silva",
      status: "confirmed",
      address: "Rua das Flores, 123 - Centro",
      price: 35.00,
      duration: "40 min"
    },
    {
      id: 2,
      service: "Barba Tradicional",
      date: "17 Nov 2023",
      time: "10:00",
      professional: "Pedro Costa",
      status: "confirmed",
      address: "Rua das Flores, 123 - Centro",
      price: 25.00,
      duration: "30 min"
    },
    {
      id: 3,
      service: "Manicure",
      date: "20 Nov 2023",
      time: "14:00",
      professional: "Ana Santos",
      status: "pending",
      address: "Rua das Flores, 123 - Centro",
      price: 30.00,
      duration: "45 min"
    }
  ];
  
  const pastBookings = [
    {
      id: 4,
      service: "Corte Feminino",
      date: "10 Nov 2023",
      time: "16:30",
      professional: "Carla Silva",
      status: "completed",
      address: "Rua das Flores, 123 - Centro",
      price: 45.00,
      duration: "60 min",
      rating: 5
    },
    {
      id: 5,
      service: "Pedicure",
      date: "5 Nov 2023",
      time: "11:00",
      professional: "Maria Oliveira",
      status: "completed",
      address: "Rua das Flores, 123 - Centro",
      price: 35.00,
      duration: "50 min",
      rating: 4
    },
    {
      id: 6,
      service: "Sobrancelha",
      date: "1 Nov 2023",
      time: "09:30",
      professional: "Carla Mendes",
      status: "cancelled",
      address: "Rua das Flores, 123 - Centro",
      price: 15.00,
      duration: "20 min"
    }
  ];
  
  const filterBookings = (bookings: any[]) => {
    return bookings.filter(booking => {
      const matchesSearch = booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           booking.professional.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  const filteredUpcoming = filterBookings(upcomingBookings);
  const filteredPast = filterBookings(pastBookings);
  const bookings = activeTab === "upcoming" ? filteredUpcoming : filteredPast;

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { label: "Confirmado", variant: "default" as const },
      pending: { label: "Pendente", variant: "secondary" as const },
      completed: { label: "Concluído", variant: "outline" as const },
      cancelled: { label: "Cancelado", variant: "destructive" as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, variant: "outline" as const };
    
    return (
      <Badge variant={config.variant} className="text-xs">
        {config.label}
      </Badge>
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="p-4 space-y-4 pb-20">
      <h1 className="text-2xl font-bold">Meus Agendamentos</h1>
      
      {/* Abas */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-2 text-center font-medium ${
            activeTab === "upcoming"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Próximos
        </button>
        <button
          className={`flex-1 py-2 text-center font-medium ${
            activeTab === "past"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("past")}
        >
          Passados
        </button>
      </div>
      
      {/* Filtros */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar agendamentos..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-24">
            <Filter className="h-4 w-4" />
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
      
      {/* Contador de resultados */}
      <div className="text-sm text-muted-foreground">
        {bookings.length} {bookings.length === 1 ? 'agendamento' : 'agendamentos'} encontrado{bookings.length === 1 ? '' : 's'}
      </div>
      
      {/* Lista de agendamentos */}
      <div className="space-y-3">
        {bookings.map(booking => (
          <Card key={booking.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 border-b">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{booking.service}</h3>
                  {getStatusBadge(booking.status)}
                </div>
                
                <div className="flex items-center mt-2 text-sm">
                  <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>{booking.date}</span>
                  <span className="mx-2 text-muted-foreground">•</span>
                  <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>{booking.time}</span>
                </div>
                
                <div className="flex items-center mt-2 text-sm">
                  <User className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>{booking.professional}</span>
                </div>
                
                <div className="flex items-center mt-2 text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">{booking.address}</span>
                </div>
                
                <div className="flex justify-between items-center mt-3">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Duração: </span>
                    <span>{booking.duration}</span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="font-semibold">{formatCurrency(booking.price)}</span>
                  </div>
                  
                  {booking.rating && (
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < booking.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Ações */}
              <div className="p-3 bg-muted/50">
                {activeTab === "upcoming" ? (
                  <div className="flex gap-2">
                    {booking.status === "pending" && (
                      <>
                        <Button variant="default" size="sm" className="flex-1">
                          Confirmar
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Reagendar
                        </Button>
                        <Button variant="destructive" size="sm" className="flex-1">
                          Cancelar
                        </Button>
                      </>
                    )}
                    {booking.status === "confirmed" && (
                      <>
                        <Button variant="outline" size="sm" className="flex-1">
                          Reagendar
                        </Button>
                        <Button variant="destructive" size="sm" className="flex-1">
                          Cancelar
                        </Button>
                        <Button size="sm" className="flex-1">
                          Ver detalhes
                        </Button>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    {booking.status === "completed" && !booking.rating && (
                      <Button variant="outline" size="sm" className="flex-1">
                        Avaliar serviço
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="flex-1">
                      Ver detalhes
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Agendar novamente
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {bookings.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <div className="bg-muted rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8" />
          </div>
          <p className="text-lg font-medium mb-2">
            {activeTab === "upcoming" 
              ? "Nenhum agendamento futuro" 
              : "Nenhum agendamento passado"}
          </p>
          <p className="text-sm mb-4">
            {activeTab === "upcoming" 
              ? "Você ainda não possui agendamentos futuros."
              : "Seu histórico de agendamentos aparecerá aqui."}
          </p>
          {activeTab === "upcoming" && (
            <Button>
              Agendar agora
            </Button>
          )}
        </div>
      )}
    </div>
  );
}