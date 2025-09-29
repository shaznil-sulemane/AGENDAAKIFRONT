// src/pages/manager/ManagerCategorys.tsx
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, Search, DollarSign, Clock } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useData } from "@/hooks/useData";
import { id, tr } from "date-fns/locale";
import { toast } from "sonner";

export default function ManagerCategory() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const {getCompanyCategories, getSelectedSalon, deleteCompanyCategory} = useData()
    const selectedSalon = getSelectedSalon();

    const [categories, setCategories] = useState<any[]>([]);
    const loadCategories = async () => {
        if (!selectedSalon) return;
        const res = await getCompanyCategories(selectedSalon?.companyId);
        setCategories(res);
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleEdit = (category: any) => {
        setEditingCategory(category);
        setIsDialogOpen(true);
    };

    const handleDelete = (categoryId: any) => {
        // Lógica para deletar serviço
        deleteCompanyCategory(categoryId).then((success) => {
            if (success) {
                toast.success("Categoria deletada com sucesso!");
                loadCategories();
            } else {
                toast.error("Erro ao deletar categoria");
            }
        });
    };

    const handleSaveCategory = () => {
        // Lógica para salvar/editar serviço
        loadCategories();
        setIsDialogOpen(false);
        setEditingCategory(null);
    };

    return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Gerenciar Categorias</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Nova Categoria
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {editingCategory ? "Editar Categoria" : "Nova Categoria"}
                            </DialogTitle>
                        </DialogHeader>
                        <CategoryForm
                            category={editingCategory}
                            onSubmit={handleSaveCategory}
                            onCancel={() => {
                                setIsDialogOpen(false);
                                setEditingCategory(null);
                            }}
                        />
                    </DialogContent>
                </Dialog>
            </div>

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

            {/* Lista de serviços */}
            <div className="space-y-3">
                {categories.map(category => (
                    <Card key={category.id}>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="font-medium">{category.name}</h3>
                                    <p className="text-sm text-muted-foreground">ID: {category.id}</p>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleEdit(category)}
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleDelete(category.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {categories.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                    <p>Nenhuma categoria encontrada</p>
                </div>
            )}
        </div>
    );
}

// Componente de formulário para criar/editar serviços
function CategoryForm({ category, onSubmit, onCancel }: any) {
    const [formData, setFormData] = useState({
        id: category?.id || null,
        name: category?.name || null,
    });

    const [categories, setCategories] = useState<string[]>([]);

    const {getCompanyCategories, getSelectedSalon, createCompanyCategory, updateCompanyCategory} = useData()

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (category) {
            // Atualizar categoria existente
            try {
                if (!formData.name) return toast.error("Nome da categoria é obrigatório");
                await updateCompanyCategory(category.id, formData.name);
                const res = await getCompanyCategories(category.companyId);
                setCategories(res);
                toast.success("Categoria atualizada com sucesso!");
            } catch (error) {
                return toast.error("Nome da categoria é obrigatório");
            }
        } else {
            const selectedSalon = getSelectedSalon();
            // Criar nova categoria
            if (!selectedSalon) return toast.error("Nenhum salão selecionado");
            try {
                if (!formData.name) return toast.error("Nome da categoria é obrigatório");
                await createCompanyCategory(formData.name);
                const res = await getCompanyCategories(selectedSalon?.companyId);
                setCategories(res);
                toast.success("Categoria criada com sucesso!");
            } catch (error) {
                return toast.error("Nome da categoria é obrigatório");
            }
        }
        onSubmit();
    };

    useEffect(() => {
        const loadCategories = async () => {
            const selectedSalon = getSelectedSalon();
            if (!selectedSalon) return;
            const res = await getCompanyCategories(selectedSalon?.companyId);
            const uniqueCategories = Array.from(new Set(res.map((cat: any) => cat.name)));
            setCategories(uniqueCategories);
        };
        loadCategories();
    }, [])

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="text-sm font-medium">Nome da Categoria</label>
                <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value.toUpperCase() })}
                    required
                />
            </div>

            <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button type="submit">
                    {category ? "Salvar" : "Criar"} Serviço
                </Button>
            </div>
        </form>
    );
}