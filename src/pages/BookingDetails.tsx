"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, User } from "lucide-react";

export default function BookingDetails() {
  const booking = {
    id: 1,
    salon: "Salão Beleza Pura",
    service: "Corte Feminino",
    professional: "Ana Santos",
    date: "25/08/2025",
    time: "14h30",
    price: "500 Mt",
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-100">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Detalhes da Marcação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p>
            <strong>Salão:</strong> {booking.salon}
          </p>
          <p>
            <strong>Serviço:</strong> {booking.service}
          </p>
          <p className="flex items-center">
            <User className="w-4 h-4 mr-1 text-gray-600" /> {booking.professional}
          </p>
          <p className="flex items-center">
            <CalendarDays className="w-4 h-4 mr-1 text-gray-600" /> {booking.date}
          </p>
          <p className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-gray-600" /> {booking.time}
          </p>
          <p>
            <strong>Preço:</strong> {booking.price}
          </p>

          <div className="flex space-x-2 mt-4">
            <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white">
              Cancelar
            </Button>
            <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
              Remarcar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
