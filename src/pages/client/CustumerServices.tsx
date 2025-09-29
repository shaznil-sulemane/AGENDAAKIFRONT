// src/pages/mobile/MobileServices.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Star, Clock } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";

export default function CustumerServices() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "Todos" },
    { id: "fequently", name: "Frequente" },
    { id: "near", name: "Proximo" },
    { id: "rate", name: "Avaliação" },
    { id: "visits", name: "Visitas" },
  ];

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

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useIsMobile()

  return (
    <div className="p-4 space-y-4 max-w-[1400px] mx-auto w-full">
      <p className="text-4xl font-bold">Serviços</p>

      {/* Barra de pesquisa */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar serviços..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Categorias */}
      <div className="overflow-x-auto whitespace-nowrap pb-2">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className="rounded-full mr-2"
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Lista de serviços */}
      <div className="space-y-3 grid max-[1000px]:grid-cols-1 max-[1600px]:grid-cols-2 min-[1600px]:grid-cols-3 gap-4">
        {filteredServices.map(service => (
          <div
            key={service.id}
            className="w-full aspect-[1/0.5]  rounded-lg shadow-2xl bg-cover bg-center text-white flex flex-col items-end justify-between"
            style={{ backgroundImage: `url('${service.img}')` }}
          >
            <div className="flex w-full justify-between flex-1 items-start bg-[#000000]/40 p-6">
              <div className="flex-1">


                <h3 className="font-semibold">{service.name}</h3>

                <div className="flex items-center mt-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-sm">{service.rating}</span>
                  <span className="mx-2">•</span>
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">{service.duration}</span>
                </div>

                <div className="mt-2">
                  <p className="text-sm">
                    Profissionais: {service.professionals.join(", ")}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end ml-4">
                <p className="font-bold text-lg">{service.price}</p>
                <Button className="mt-2 bg-[#00c951]" size="sm" onClick={() => navigate(`/dashboard/client/book?id=${service.id}`)}>
                  Agendar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>Nenhum serviço encontrado</p>
        </div>
      )}
    </div>
  );
}