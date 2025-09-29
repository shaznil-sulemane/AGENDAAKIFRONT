import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/lib/ImageCropper";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useData } from "@/hooks/useData";
import { useAuth } from "@/hooks/useAuth";
import type { Company } from "@/lib/types";

export const CompanyType = {
  SALON: "SALON",
  BARBERSHOP: "BARBERSHOP",
  CLINIC: "CLINIC",
  SPA: "SPA",
  OTHER: "OTHER",
} as const;

export type CompanyType = typeof CompanyType[keyof typeof CompanyType];

export default function CreateCompanyForm({ className, ...props }: React.ComponentProps<"form">) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  // const [type, setType] = useState<CompanyType>(CompanyType.OTHER);

  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [bannerCrop, setBannerCrop] = useState({ x: 0, y: 0 });
  const [bannerZoom, setBannerZoom] = useState(1);

  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profileUrl, setProfileUrl] = useState<string | null>(null);
  const [profileCrop, setProfileCrop] = useState({ x: 0, y: 0 });
  const [profileZoom, setProfileZoom] = useState(1);

  const navigate = useNavigate();

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);


  const { createCompany, setSelectedSalon } =
    useData();
  const { user } =
    useAuth();

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBannerFile(e.target.files[0]);
      setBannerUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileFile(e.target.files[0]);
      setProfileUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user) {
        toast.error("Usuário não autenticado");
        setLoading(false);
        return;
      }
      let finalProfile: File | null = null;
      let finalBanner: File | null = null;
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("owner", user.id);
      formData.append("logo", profileFile as Blob);
      formData.append("banner", bannerFile as Blob);


      if (bannerFile && bannerUrl) {
        // finalBanner = await getCroppedImg(bannerUrl, bannerCrop, bannerZoom, 1200, 300);
      }

      if (profileFile && profileUrl) {
        // finalProfile = await getCroppedImg(profileUrl, profileCrop, profileZoom, 200, 200);
      }

      await createCompany(formData).then((res) => {
        if (!res) {
          toast.error("Erro ao criar empresa");
          setLoading(false);
          return;
        }
        
        console.log("Empresa criada com sucesso.\n", res);

        const companyId = res?.id;
        const companyName = res?.name;

        const comp : Company = { companyId, companyName };
        
        setSelectedSalon(comp);
        toast.success("Empresa criada com sucesso!. ID: "+ res.id + " Agora você pode criar seus serviços e agendamentos.");
        navigate("/dashboard/manager/plan");
      })
        .catch((err) => {
          toast.error(err.message || "Erro ao criar empresa")
          setLoading(false)
          return
        });
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar empresa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={cn("max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <h1 className="text-3xl font-bold text-center">Criar Empresa</h1>

      {/* Banner */}
      <div className="flex flex-col gap-2">
        <Label>Banner da Empresa</Label>
        <div
          className="relative w-full h-48 bg-gray-200 rounded overflow-hidden cursor-pointer flex items-center justify-center"
          onClick={() => bannerInputRef.current?.click()}
        >
          {!bannerUrl && <span className="text-gray-500">Clique para escolher o banner</span>}
          {bannerUrl && (
            <Cropper
              image={bannerUrl}
              crop={bannerCrop}
              zoom={bannerZoom}
              aspect={5 / 3}
              onCropChange={setBannerCrop}
              onZoomChange={setBannerZoom}
            />
          )}
        </div>
        <input type="file" accept="image/*" ref={bannerInputRef} onChange={handleBannerChange} className="hidden" />
        {bannerUrl && <input type="range" min={1} max={3} step={0.01} value={bannerZoom} onChange={(e) => setBannerZoom(Number(e.target.value))} className="w-full" />}
      </div>

      {/* Perfil */}
      <div className="flex flex-col gap-2">
        <Label>Foto de Perfil</Label>
        <div
          className="relative w-48 h-48 bg-gray-200 rounded-full overflow-hidden cursor-pointer flex items-center justify-center mx-auto"
          onClick={() => profileInputRef.current?.click()}
        >
          {!profileUrl && <span className="text-gray-500">Clique para escolher a foto</span>}
          {profileUrl && (
            <Cropper
              image={profileUrl}
              crop={profileCrop}
              zoom={profileZoom}
              aspect={1}
              onCropChange={setProfileCrop}
              onZoomChange={setProfileZoom}
            />
          )}
        </div>
        <input type="file" accept="image/*" ref={profileInputRef} onChange={handleProfileChange} className="hidden" />
        {profileUrl && <input type="range" min={1} max={3} step={0.01} value={profileZoom} onChange={(e) => setProfileZoom(Number(e.target.value))} className="w-full" />}
      </div>

      {/* Campos */}
      <div className="flex flex-col gap-4">
        <Input placeholder="Nome da Empresa" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input type="email" placeholder="Email Corporativo" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <Input placeholder="Endereço" value={address} onChange={(e) => setAddress(e.target.value)} required />
        {/* <Select value={type} onValueChange={(val) => setType(val as CompanyType)}>
          <SelectTrigger>
            <SelectValue placeholder="Tipo de Empresa" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(CompanyType).map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select> */}
      </div>

      <Button type="submit" className="w-full mt-4" disabled={loading} onClick={handleSubmit}>
        {loading ? "Cadastrando..." : "Criar Empresa"}
      </Button>
    </form>
  );
}
