// src/pages/manager/ManagerSchedule.tsx
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, User, CheckCircle, XCircle } from "lucide-react";

export default function ManagerSchedule() {
  const [selectedDate] = useState(new Date());
  const [view, setView] = useState<"day" | "week">("day");

  // Dados mockados da agenda
  const appointments = [
    {
      id: 1,
      client: "Maria Santos",
      service: "Corte Feminino",
      professional: "Carla Silva",
      date: new Date(2024, 0, 15, 14, 0),
      duration: 60,
      status: "confirmed",
      price: 45.00
    },
    {
      id: 2,
      client: "João Oliveira",
      service: "Barba",
      professional: "Pedro Costa",
      date: new Date(2024, 0, 15, 14, 30),
      duration: 30,
      status: "confirmed",
      price: 25.00
    },
    {
      id: 3,
      client: "Ana Pereira",
      service: "Manicure",
      professional: "Juliana Martins",
      date: new Date(2024, 0, 15, 15, 0),
      duration: 45,
      status: "pending",
      price: 30.00
    },
    {
      id: 4,
      client: "Carlos Souza",
      service: "Corte Masculino",
      professional: "João Silva",
      date: new Date(2024, 0, 15, 16, 0),
      duration: 40,
      status: "cancelled",
      price: 35.00
    }
  ];

  const timeSlots = [];
  for (let hour = 8; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      timeSlots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
    }
  }

  const getAppointmentsForTime = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    return appointments.filter(appt => 
      appt.date.getHours() === hour && 
      appt.date.getMinutes() === minute
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "text-green-600 bg-green-100";
      case "pending": return "text-yellow-600 bg-yellow-100";
      case "cancelled": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed": return "Confirmado";
      case "pending": return "Pendente";
      case "cancelled": return "Cancelado";
      default: return "Desconhecido";
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Agenda</h1>
        <div className="flex gap-2">
          <Button
            variant={view === "day" ? "default" : "outline"}
            onClick={() => setView("day")}
          >
            Dia
          </Button>
          <Button
            variant={view === "week" ? "default" : "outline"}
            onClick={() => setView("week")}
          >
            Semana
          </Button>
        </div>
      </div>

      {/* Header da data */}
      <div className="bg-muted p-3 rounded-lg text-center">
        <h2 className="font-semibold">
          {selectedDate.toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
          })}
        </h2>
      </div>

      {/* Estatísticas do dia */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-green-600">8</p>
            <p className="text-sm text-muted-foreground">Confirmados</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-yellow-600">2</p>
            <p className="text-sm text-muted-foreground">Pendentes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-red-600">1</p>
            <p className="text-sm text-muted-foreground">Cancelados</p>
          </CardContent>
        </Card>
      </div>

      {/* Timeline da agenda */}
      <div className="space-y-3">
        <h3 className="font-semibold">Agendamentos do Dia</h3>
        
        {timeSlots.map(time => {
          const timeAppointments = getAppointmentsForTime(time);
          return (
            <div key={time} className="flex border-b pb-3">
              <div className="w-16 flex-shrink-0">
                <p className="text-sm font-medium">{time}</p>
              </div>
              
              <div className="flex-1 space-y-2">
                {timeAppointments.map(appt => (
                  <Card key={appt.id} className={`border-l-4 ${
                    appt.status === "confirmed" ? "border-l-green-500" :
                    appt.status === "pending" ? "border-l-yellow-500" :
                    "border-l-red-500"
                  }`}>
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium">{appt.client}</h4>
                          <p className="text-sm text-muted-foreground">{appt.service}</p>
                          
                          <div className="flex items-center mt-2 text-sm">
                            <User className="w-4 h-4 mr-1 text-muted-foreground" />
                            <span>{appt.professional}</span>
                          </div>
                          
                          <div className="flex items-center mt-1 text-sm">
                            <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                            <span>{appt.duration} min • R$ {appt.price.toFixed(2)}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end">
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(appt.status)}`}>
                            {getStatusText(appt.status)}
                          </span>
                          
                          {appt.status === "pending" && (
                            <div className="flex gap-1 mt-2">
                              <Button size="sm" variant="outline" className="h-6 w-6 p-0">
                                <CheckCircle className="w-3 h-3 text-green-600" />
                              </Button>
                              <Button size="sm" variant="outline" className="h-6 w-6 p-0">
                                <XCircle className="w-3 h-3 text-red-600" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {timeAppointments.length === 0 && (
                  <div className="text-center py-2 text-muted-foreground text-sm">
                    Sem agendamentos
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}