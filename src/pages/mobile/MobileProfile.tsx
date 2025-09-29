"use client";

import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Edit, LogOut, Calendar } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function MobileProfile() {
  const { user, logout } = useAuth();
  const [editing, setEditing] = useState(false);

  const userDetails = {
    phone: "(11) 99999-9999",
    address: "Rua das Flores, 123 - São Paulo, SP",
    joinedDate: "Novembro 2023",
    appointments: 12,
    rating: 4.8,
  };

  return (
    <div className="p-4 space-y-4 max-w-[1400px] mx-auto w-full">
      <h1 className="text-3xl md:text-4xl font-bold text-center">Meu Perfil</h1>

      {/* Avatar e Nome */}
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition">
        <CardContent className="flex flex-col md:flex-row items-center gap-4 p-4">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold">
            {user?.fullname?.charAt(0) || "U"}
          </div>
          <div className="flex-1 text-center md:text-left">
            {editing ? (
              <Input
                className="w-full font-semibold text-xl md:text-2xl"
                value={user?.fullname}
              />
            ) : (
              <h2 className="font-semibold text-xl md:text-2xl">{user?.fullname}</h2>
            )}
            <p className="text-muted-foreground text-sm">{user?.email}</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setEditing(!editing)}
            className="self-start md:self-center"
          >
            <Edit className="h-5 w-5" />
          </Button>
        </CardContent>
      </Card>

      {/* Contato e Endereço */}
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition">
        <CardContent className="space-y-4 p-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p>{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Telefone</p>
              {editing ? (
                <Input className="w-full" value={userDetails.phone} />
              ) : (
                <p>{userDetails.phone}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <div className="w-full">
              <p className="text-sm text-muted-foreground">Endereço</p>
              {editing ? (
                <Input className="w-full" value={userDetails.address} />
              ) : (
                <p>{userDetails.address}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Membro desde</p>
              <p>{userDetails.joinedDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4">Estatísticas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-muted rounded-lg shadow-sm hover:shadow-md transition">
              <p className="text-2xl font-bold">{userDetails.appointments}</p>
              <p className="text-sm text-muted-foreground">Agendamentos</p>
            </div>
            <div className="p-3 bg-muted rounded-lg shadow-sm hover:shadow-md transition">
              <p className="text-2xl font-bold">{userDetails.rating}</p>
              <p className="text-sm text-muted-foreground">Avaliação média</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ações */}
      <div className="grid grid-cols-1 gap-3">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setEditing(!editing)}
        >
          {editing ? "Salvar Alterações" : "Editar perfil"}
        </Button>
        <Button variant="outline" className="w-full">
          Alterar senha
        </Button>
        <Button
          variant="outline"
          className="w-full text-destructive flex items-center justify-center gap-2"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" /> Sair
        </Button>
      </div>
    </div>
  );
}
