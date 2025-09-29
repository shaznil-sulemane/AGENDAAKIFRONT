// src/pages/manager/ManagerServices.tsx
import { useCallback, useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, Search, DollarSign, Clock } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useData } from "@/hooks/useData";
import { getCroppedImg } from "@/lib/ImageCropper";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import Cropper from "react-easy-crop";
import type { Service } from "@/lib/types";

export default function ManagerServices() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);


    const {
        getCompanyServices,
        deleteCompanyService,
        getSelectedSalon
    } = useData();

    const selectedSalon = getSelectedSalon();
    const [services, setServices] = useState<Service[]>([]);

    // Carregar serviços ao abrir página
    useEffect(() => {
        if (!selectedSalon) return;
        loadServices();
    }, [selectedSalon]);

    const reloadServices = async () => {
        if (!selectedSalon) return;
        const res = await getCompanyServices(selectedSalon.companyId);
        setServices(res);
    };

    const loadServices = async () => {
        if (!selectedSalon) return;
        const res = await getCompanyServices(selectedSalon.companyId);
        setServices(res);
    };

    const handleDelete = async (serviceId: string) => {
        try {
            await deleteCompanyService(serviceId);
            toast.success("Serviço deletado!");
            loadServices();
        } catch {
            toast.error("Erro ao deletar serviço");
        }
    };


    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (service: any) => {
        setEditingService(service);
        setIsDialogOpen(true);
    };

    return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <p className="text-[1.4rem] font-bold">Gerenciar Serviços</p>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-green-500" onClick={() => setEditingService(null)}>
                            <Plus className="w-4 h-4 mr-2" />
                            Novo Serviço
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {editingService ? "Editar Serviço" : "Novo Serviço"}
                            </DialogTitle>
                        </DialogHeader>
                        <ServiceForm
                            service={editingService}
                            onSubmit={() => {
                                reloadServices();
                                loadServices();
                                setIsDialogOpen(false);
                                setEditingService(null);
                            }}
                            onCancel={() => {
                                setIsDialogOpen(false);
                                setEditingService(null);
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

            {/* <Button onClick={() => {
                loadServices()
            }}>
                Exportar Lista (CSV)
            </Button> */}

            {/* Lista de serviços */}
            <div className="space-y-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {filteredServices.map(service => (
                    <Card key={service.id}>
                        <CardContent className="p-4">
                            <img
                                // src='https://www.einfosoft.com/templates/admin/redstar/source/light/img/blog/blog1.jpg'
                                src={`http://localhost:4000/images/service/${service.id}/banner`}
                                alt="Service"
                                className="mb-4 rounded w-full object-cover"
                            />
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold">{service.name}</h3>
                                        {!service.active && (
                                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                Inativo
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                                            {service.category}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4 mt-3 text-sm">
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                                            <span>{service.durationMinutes} min</span>
                                        </div>
                                        <div className="flex items-center">
                                            <DollarSign className="w-4 h-4 mr-1 text-muted-foreground" />
                                            <span>R$ {service.price.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="mt-2">
                                        <p className="text-sm text-muted-foreground">
                                            {/* Profissionais: {service.professionals.join(", ")} */}
                                        </p>
                                    </div>
                                </div>


                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleEdit(service)}
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button>

                                    {/* Botão de apagar com confirmação */}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="icon">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Confirmar exclusão</DialogTitle>
                                                <DialogDescription>
                                                    Tem certeza que deseja excluir o serviço{" "}
                                                    <strong>{service.name}</strong>? Esta ação não pode ser desfeita.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <Button variant="outline">Cancelar</Button>
                                                <Button
                                                    variant="destructive"
                                                    onClick={() => handleDelete(service.id)}
                                                >
                                                    Apagar
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
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

function ServiceForm({ service, onSubmit, onCancel }: any) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [profileFile, setProfileFile] = useState<File | null>(null);
    const [profileUrl, setProfileUrl] = useState<string | null>(
        service
            ? `http://localhost:4000/images/service/${service.id}/banner`
            : null
    );
    const [profileCrop, setProfileCrop] = useState({ x: 0, y: 0 });
    const [profileZoom, setProfileZoom] = useState(1);
    const [finalProfile, setFinalProfile] = useState<File | null>(null);
    const profileInputRef = useRef<HTMLInputElement>(null);

    const { getCompanyCategories, getSelectedSalon, updateCompanyService, createCompanyService } =
        useData();
    const [categories, setCategories] = useState<any[]>([]);
    const selectedSalon = getSelectedSalon();

    const [formData, setFormData] = useState({
        companyId: selectedSalon?.companyId,
        name: service?.name || "",
        description: service?.description || "",
        category: service?.category || "",
        durationMinutes: service?.durationMinutes || "",
        price: service?.price || "",
        active: service?.active ?? true,
        professionals: service?.professionals || [],
    });

    // Carregar categorias
    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {

        const selectSalon = getSelectedSalon();
        if (!selectSalon) return;
        const res = await getCompanyCategories(selectSalon.companyId);
        setCategories(res);
    };

    const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
        x: number;
        y: number;
        width: number;
        height: number;
    } | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);

    // Quando o crop muda, atualiza a área em pixels
    const onCropComplete = useCallback(
        (croppedArea: any, croppedAreaPixels: any) => {
            setCroppedAreaPixels(croppedAreaPixels);
        },
        []
    );
    // Gerar preview automaticamente sempre que a imagem mudar
    useEffect(() => {
        const generatePreview = async () => {
            if (profileUrl && profileFile) {
                try {
                    if(!croppedAreaPixels) return;
                    const cropped = await getCroppedImg(
                        profileUrl,
                        croppedAreaPixels
                    );
                    
                    setFinalProfile(new File([cropped], profileFile.name, { type: profileFile.type }));
                } catch {
                    toast.error("Erro ao processar imagem");
                }
            }
        };
        generatePreview();
    }, [profileUrl, profileCrop, profileZoom, profileFile]);

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfileFile(e.target.files[0]);
            setProfileUrl(URL.createObjectURL(e.target.files[0]));
        }
    };

    // useEffect para gerar preview automaticamente
    useEffect(() => {
        const generatePreview = async () => {
            if (profileUrl) {
                try {
                     if(!croppedAreaPixels) return;
                    const cropped = await getCroppedImg(
                        profileUrl,
                        croppedAreaPixels
                    );
                    
                    setFinalProfile(new File([cropped], "cropped.png", { type: "image/png" }));
                
                    // Gerar URL para preview
                    const url = URL.createObjectURL(cropped);
                    setPreviewUrl(url);
                } catch {
                    toast.error("Erro ao gerar preview");
                }
            }
        };

        // generatePreview();
    }, [profileCrop, profileZoom]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const _formData = new FormData();
            if (selectedSalon?.companyId) {
                _formData.append("companyId", selectedSalon.companyId);
                if (finalProfile) {
                    // _formData.append("banner", await getCroppedImg(
                    //     profileUrl!,
                    //     profileCrop,
                    //     profileZoom,
                    //     340,
                    //     220
                    // ));
                }

            } else {
                if (!finalProfile) {
                    return toast.error("Selecione e ajuste uma imagem de profile");
                }
                _formData.append("banner", finalProfile);

            }
            _formData.append("name", formData.name);
            _formData.append("description", formData.description);
            _formData.append("price", formData.price.toString());
            _formData.append("category", formData.category);
            _formData.append("durationMinutes", formData.durationMinutes.toString());
            _formData.append("active", formData.active.toString());

            if (profileFile) {
                if(!croppedAreaPixels) return;
                const fileToSend = profileCrop.x !== 0 || profileCrop.y !== 0 || profileZoom !== 1
                    ? await getCroppedImg(profileUrl!, croppedAreaPixels): profileFile;

                _formData.append("banner", fileToSend);
            }

            if (service) {
                const res = await updateCompanyService(service.id, _formData);
                if (res == null) {
                    return toast.error("Erro ao atualizar serviço");
                }

                toast.success("Serviço atualizado com sucesso!");
            } else {
                const res = await createCompanyService(_formData);
                if (res == null) {
                    return toast.error("Erro ao criar serviço");
                }
                toast.success("Serviço criado com sucesso!");
            }
        } catch (error: any) {
            toast.error(error.message || "Erro ao salvar serviço");
        } finally {
            onSubmit();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
            {/* Upload e Crop */}<div className="flex flex-col gap-2">
                <Label>Profile da Empresa</Label>
                <div
                    className="relative w-full h-68 bg-gray-200 rounded overflow-hidden cursor-pointer flex items-center justify-center"
                    onClick={() => profileInputRef.current?.click()}
                >
                    {!profileUrl && (
                        <span className="text-gray-500">Clique para escolher o profile</span>
                    )}
                    {profileUrl && (
                        <Cropper
                            image={profileUrl}
                            crop={profileCrop}
                            zoom={profileZoom}
                            aspect={340 / 220}
                            onCropChange={setProfileCrop}
                            onZoomChange={setProfileZoom}
                            onCropComplete={onCropComplete}
                        />

                    )}
                </div>
                <input
                    type="file"
                    accept="image/*"
                    ref={profileInputRef}
                    onChange={handleProfileChange}
                    className="hidden"
                />
                {profileUrl && (
                    <input
                        type="range"
                        min={1}
                        max={3}
                        step={0.01}
                        value={profileZoom}
                        onChange={(e) => setProfileZoom(Number(e.target.value))}
                        className="w-full"
                    />
                )}

                {/* Preview */}
                {previewUrl && (
                    <div className="mt-2">
                        <label className="text-sm font-medium">Preview:</label>
                        <img
                            src={previewUrl}
                            width={340}
                            height={220}
                            alt="Preview do banner"
                            className="rounded border border-gray-300"
                        />
                    </div>
                )}
            </div>


            {/* Dados do serviço */}
            <div>
                <label className="text-sm font-medium">Nome do Serviço</label>
                <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
            </div>

            <div>
                <label className="text-sm font-medium">Descrição</label>
                <textarea
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                    className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Escreva uma breve descrição do serviço..."
                    required
                />
            </div>

            <div>
                <label className="text-sm font-medium">Categoria</label>
                <Input
                    value={formData.category}
                    onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                    }
                    required
                />
                {categories.length > 0 && (
                    <div className="mt-2 text-xs text-muted-foreground">
                        Categorias existentes: {categories.join(", ")}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium">Duração (minutos)</label>
                    <Input
                        type="number"
                        value={formData.durationMinutes}
                        onChange={(e) =>
                            setFormData({ ...formData, durationMinutes: e.target.value })
                        }
                        required
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Preço (R$)</label>
                    <Input
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) =>
                            setFormData({ ...formData, price: e.target.value })
                        }
                        required
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="active"
                    checked={formData.active}
                    onChange={(e) =>
                        setFormData({ ...formData, active: e.target.checked })
                    }
                    className="rounded"
                />
                <label htmlFor="active" className="text-sm font-medium">
                    Serviço ativo
                </label>
            </div>

            <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button type="submit">{service ? "Salvar" : "Criar"} Serviço</Button>
            </div>
        </form>
    );
}
