"use client";

import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Phone } from "lucide-react";

export default function SalonDetails() {
  const { id } = useParams();

  // Fake data
  const salon = {
    id,
    name: "Salão Beleza Pura",
    rating: 4.9,
    distance: "3.5 km",
    phone: "+258 84 123 4567",
    img: `https://picsum.photos/600/300?random=${id}`,
    description:
      "Um espaço moderno e confortável, especializado em cuidados de beleza e bem-estar.",
    services: [
      {
        id: 1,
        name: "Corte Feminino",
        price: "500 Mt",
        duration: "60 min",
        img: `https://picsum.photos/400/300?random=11`,
      },
      {
        id: 2,
        name: "Manicure",
        price: "300 Mt",
        duration: "45 min",
        img: `https://picsum.photos/400/300?random=12`,
      },
      {
        id: 3,
        name: "Pedicure",
        price: "350 Mt",
        duration: "50 min",
        img: `https://picsum.photos/400/300?random=13`,
      },
      {
        id: 4,
        name: "Massagem Relaxante",
        price: "700 Mt",
        duration: "90 min",
        img: `https://picsum.photos/400/300?random=14`,
      },
    ],
  };

  return (
    <div className="p-4 space-y-4 max-w-[1400px] mx-auto w-full">
      {/* Banner principal */}
      <img
        src={salon.img}
        alt={salon.name}
        className="w-full h-60 object-cover rounded-xl shadow-md"
      />

      {/* Info do salão */}
      <div>
        <h1 className="text-2xl font-bold">{salon.name}</h1>
        <div className="flex items-center text-sm text-gray-600 mt-1">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
          {salon.rating}
          <span className="mx-2">•</span>
          <MapPin className="w-4 h-4 mr-1" />
          {salon.distance}
        </div>
        <p className="text-sm text-gray-500 mt-2">{salon.description}</p>
        <div className="flex items-center mt-3 text-sm text-gray-700">
          <Phone className="w-4 h-4 mr-1" />
          {salon.phone}
        </div>
      </div>

      {/* Serviços */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Serviços Disponíveis</h2>

        <div className="grid gap-4 max-[600px]:grid-cols-1 max-[900px]:grid-cols-2 max-[1300px]:grid-cols-3 max-[1700px]:grid-cols-4 min-[1700px]:grid-cols-5">
          {salon.services.map((service) => (
            <Card
              key={service.id}
              className="overflow-hidden shadow-md hover:shadow-lg transition rounded-xl flex flex-col"
            >
              <img
                src={service.img}
                alt={service.name}
                className="w-full h-40 object-cover"
              />
              <CardContent className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <p className="font-medium text-lg">{service.name}</p>
                  <p className="text-sm text-gray-500">
                    {service.duration} • {service.price}
                  </p>
                </div>
                <Button className="mt-3 w-full bg-[#00c951] hover:bg-[#00a843]">
                  Agendar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
