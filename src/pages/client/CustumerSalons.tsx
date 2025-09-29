"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Star, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CustumerSalons() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const salons = [
    {
      id: 1,
      name: "Barbearia Estilo",
      rating: 4.8,
      distance: "2 km",
      img: "https://picsum.photos/400/250?random=8",
      services: ["Corte Masculino", "Barba Tradicional"],
    },
    {
      id: 2,
      name: "Salão Beleza Pura",
      rating: 4.9,
      distance: "3.5 km",
      img: "https://picsum.photos/400/250?random=2",
      services: ["Manicure", "Pedicure", "Corte Feminino"],
    },
    {
      id: 3,
      name: "Spa Relax",
      rating: 4.7,
      distance: "5 km",
      img: "https://picsum.photos/400/250?random=3",
      services: ["Massagem", "Limpeza de Pele"],
    },
  ];

  const filteredSalons = salons.filter((salon) =>
    salon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4 max-w-[1400px] mx-auto w-full">
      <p className="text-3xl font-bold">Salões</p>

      {/* Barra de pesquisa */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar salões..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Lista de salões */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredSalons.map((salon) => (
          <Card
            key={salon.id}
            className="overflow-hidden cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/dashboard/salon/${salon.id}`)}
          >
            <img src={salon.img} alt={salon.name} className="h-40 w-full object-cover" />
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg">{salon.name}</h3>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                {salon.rating}
                <span className="mx-2">•</span>
                <MapPin className="w-4 h-4 mr-1" />
                {salon.distance}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {salon.services.slice(0, 2).join(", ")}...
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSalons.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>Nenhum salão encontrado</p>
        </div>
      )}
    </div>
  );
}
