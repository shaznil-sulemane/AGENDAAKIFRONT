import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { Avatar } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";


const services = [
  { id: 1, name: "Corte de Cabelo", img: `https://picsum.photos/300/200?random=1` },
  { id: 2, name: "Barba", img: `https://picsum.photos/300/200?random=2` },
  { id: 3, name: "Manicure", img: `https://picsum.photos/300/200?random=9` },
  { id: 4, name: "Pedicure", img: `https://picsum.photos/300/200?random=4` },
  { id: 5, name: "Tratamento Facial", img: `https://picsum.photos/300/200?random=5` },
  { id: 6, name: "Massagem", img: `https://picsum.photos/300/200?random=6` },
];

export default function Dashboard() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <div className="w-full max-w-md flex flex-col gap-4">
        
        {/* Barra de pesquisa */}
        <Input type="search" className="w-full" placeholder="Pesquisar" />

        {/* Banner promocional */}
        <div
          className="relative w-full h-[250px] rounded-lg shadow-2xl bg-cover bg-center text-white flex flex-col items-end justify-between p-6"
          style={{ backgroundImage: "url('placeholder.png')" }}
        >
          <p className="text-3xl font-bold max-w-[50vw] text-right drop-shadow-lg">
            Get 20% off on all haircuts. Limited time offer
          </p>
          <Button variant="destructive" className="mt-4 bg-green-600 hover:bg-green-700 transition-all">
            Book Now
          </Button>
        </div>

        {/* Categorias */}
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between w-full">
            <Label className="text-xl font-bold">Categorias</Label>
            <Link to="#">Ver tudo</Link>
          </div>
          <div className="flex gap-2 py-2 overflow-x-auto whitespace-nowrap">
            {services.slice(0, 4).map((service) => (
              <div
                key={service.id}
                className="flex flex-col w-32 items-center shadow-md rounded-lg cursor-pointer hover:scale-105 transition-transform"
              >
                <img
                  src={service.img}
                  alt={service.name}
                  className="w-full h-20 object-cover rounded-t-lg"
                />
                <span className="text-xs font-semibold p-2 text-center">{service.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Serviços em alta */}
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between w-full">
            <Label className="text-xl font-bold">Serviços em alta</Label>
            <Link to="#">Ver tudo</Link>
          </div>
          <div className="grid grid-cols-2 gap-4 py-2">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex flex-col items-center shadow-md rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
              >
                <img
                  src={service.img}
                  alt={service.name}
                  className="w-full h-28 object-cover"
                />
                <span className="text-sm font-semibold p-2 text-center">{service.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
