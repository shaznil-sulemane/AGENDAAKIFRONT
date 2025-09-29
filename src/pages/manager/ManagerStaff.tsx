// src/pages/manager/ManagerStaff.tsx
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, Search, User, Mail, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useData } from "@/hooks/useData";

export default function ManagerStaff() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const {inviteStaff, getSelectedSalon} = useData()

  // Dados mockados da equipe
  const staffMembers = [
    {
      id: 1,
      name: "João Silva",
      email: "joao@email.com",
      phone: "(11) 99999-9999",
      role: "Barbeiro",
      services: ["Corte Masculino", "Barba"],
      active: true
    },
    {
      id: 2,
      name: "Ana Santos",
      email: "ana@email.com",
      phone: "(11) 98888-8888",
      role: "Manicure",
      services: ["Manicure", "Pedicure"],
      active: true
    },
    {
      id: 3,
      name: "Pedro Costa",
      email: "pedro@email.com",
      phone: "(11) 97777-7777",
      role: "Barbeiro",
      services: ["Barba", "Sobrancelha"],
      active: false
    }
  ];

  const filteredStaff = staffMembers.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (staff: any) => {
    setEditingStaff(staff);
    setIsDialogOpen(true);
  };

  const handleDelete = (staffId: any) => {
    // Lógica para deletar membro da equipe
    console.log("Deletar membro:", staffId);
  };

  const handleSaveStaff = (staffData: any) => {
    // Lógica para salvar/editar membro da equipe
    console.log("Salvar membro:");
    inviteStaff(staffData.identifier)
    setIsDialogOpen(false);
    setEditingStaff(null);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold">Gerenciar Equipe</p>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-500">
              <Plus className="w-4 h-4 mr-2" />
              Novo Membro
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingStaff ? "Editar Membro" : "Novo Membro"}
              </DialogTitle>
            </DialogHeader>
            <StaffForm
              staff={editingStaff}
              onSubmit={handleSaveStaff}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingStaff(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Barra de pesquisa */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar equipe..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Lista da equipe */}
      <div className="space-y-3">
        {filteredStaff.map(staff => (
          <Card key={staff.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-green-500">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{staff.name}</h3>
                      <p className="text-sm text-muted-foreground">{staff.role}</p>
                    </div>
                    {!staff.active && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded ml-auto">
                        Inativo
                      </span>
                    )}
                  </div>

                  <div className="mt-3 space-y-1 text-sm">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>{staff.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>{staff.phone}</span>
                    </div>
                  </div>

                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground">
                      Serviços: {staff.services.join(", ")}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(staff)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(staff.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>Nenhum membro da equipe encontrado</p>
        </div>
      )}
    </div>
  );
}

// Componente de formulário para criar/editar membros da equipe
function StaffForm({ staff, onSubmit, onCancel }: { staff: { identifier: string, role: string, services: string, active: string }, onSubmit: string, onCancel: string }) {
  const [formData, setFormData] = useState({
    identifier: staff?.identifier || "",
    role: staff?.role || "",
    services: staff?.services || [],
    active: staff?.active ?? true
  });

  const [newFormData, setNewFormData] = useState({
    identifier: staff?.identifier || "",
    role: staff?.role || "",
    services: staff?.services || [],
    active: true
  });

  const availableServices = ["Corte Masculino", "Barba", "Manicure", "Pedicure", "Sobrancelha"];

  const handleServiceToggle = (service: never) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s: never) => s !== service)
        : [...prev.services, service]
    }));
    setNewFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s: never) => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = (e: { preventDefault: Function }) => {
    e.preventDefault();
    onSubmit(newFormData);
  };

  if (!staff) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Identificador</label>
          <Input
            value={newFormData.identifier}
            onChange={(e) => setNewFormData({ ...newFormData, identifier: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Cargo / Função</label>
          <Input
            value={newFormData.role}
            onChange={(e) => setNewFormData({ ...newFormData, role: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Serviços</label>
          <div className="grid grid-cols-2 gap-2">
            {availableServices.map(service => (
              <label key={service} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newFormData.services.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                  className="rounded"
                />
                <span className="text-sm">{service}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="active"
            checked={newFormData.active}
            onChange={(e) => setNewFormData({ ...newFormData, active: e.target.checked })}
            className="rounded"
          />
          <label htmlFor="active" className="text-sm font-medium">
            Membro ativo
          </label>
        </div>

        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            {staff ? "Salvar" : "Criar"} Membro
          </Button>
        </div>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Nome</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium">Email</label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium">Telefone</label>
        <Input
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium">Cargo/Função</label>
        <Input
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Serviços</label>
        <div className="grid grid-cols-2 gap-2">
          {availableServices.map(service => (
            <label key={service} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.services.includes(service)}
                onChange={() => handleServiceToggle(service)}
                className="rounded"
              />
              <span className="text-sm">{service}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="active"
          checked={formData.active}
          onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
          className="rounded"
        />
        <label htmlFor="active" className="text-sm font-medium">
          Membro ativo
        </label>
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {staff ? "Salvar" : "Criar"} Membro
        </Button>
      </div>
    </form>
  );
}