// src/context/AuthContext.tsx
import { useAuth } from "@/hooks/useAuth";
import { api, ls } from "@/lib/axios";
import type { Company, DataContextType } from "@/lib/types";
import { compareAsc } from "date-fns";
import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  // Manager States
  const [salons, setSalonsIds] = useState<Company[] | null>(null);
  const [selectedSalon, _setSelectedSalon] = useState<Company | null>(null);

  // ================== SALONS ==================
  const getManagerSalons = async (managerId: string) => {
    try {
      const res = await api.get(`/companies/${managerId}`);
      if (res.data.success) {
        const salons: Company[] = res.data.data;
        setSalonsIds(salons);
        return salons;
      }
      return res.data;
    } catch (err) {
      console.error("Erro ao buscar salões do gerente:", err);
      return [];
    }
  };

  const setSelectedSalon = (salon: Company | null) => {
    _setSelectedSalon(salon);
    if (salon) ls.set("selectedSalon", salon);
    else ls.remove("selectedSalon");
  };

  const getSelectedSalon = () => {
    if (!selectedSalon) {
      const storedSalon = ls.get("selectedSalon");
      if (storedSalon) {
        _setSelectedSalon(storedSalon);
        return storedSalon;
      }
      return null;
    }
    return selectedSalon;
  };

  // ================== PLANS ==================
  const getAllPlans = async () => {
    try {
      const res = await api.get("/plan");
      return res.data.data;
    } catch (err) {
      return [];
    }
  };

  // ================== CATEGORIES ==================
  const getCompanyCategories = async (companyId: string) => {
    try {
      const res = await api.get(`/category/${companyId}`);
      return res.data.data;
    } catch (err) {
      return [];
    }
  };

  const deleteCompanyCategory = async (categoryId: string) => {
    try {
      const res = await api.delete(`/category/${categoryId}`);
      return res.data.success;
    } catch (err) {
      return false;
    }
  };

  const createCompanyCategory = async (name: string) => {
    try {
      const res = await api.post(`/category/${selectedSalon?.companyId}`, { name });
      return res.data.data;
    } catch (err) {
      return null;
    }
  };

  const updateCompanyCategory = async (id: string, name: string) => {
    try {
      const res = await api.put(`/category/${selectedSalon?.companyId}`, { id, name });
      return res.data.data;
    } catch (err) {
      return null;
    }
  };

  // ================== SERVICES ==================
  const getCompanyServices = async (companyId: string) => {
    try {
      const res = await api.get(`/service/${companyId}`);
      console.log("Res");
      console.log(res.data);

      return res.data;
    } catch (err) {
      console.log("err: ", err);

      return [];
    }
  };


  // ================== SERVICES ==================
  const getMyCompanyServices = async (companyId: string) => {
    try {
      const res = await api.get(`/service/${companyId}`);
      return res.data.data;
    } catch (err) {
      return [];
    }
  };

  const createCompanyService = async (formData: FormData) => {
    try {
      const res = await api.post(`/service`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data;
    } catch (err) {
      return null;
    }
  };

  const updateCompanyService = async (serviceId: string, formData: FormData) => {
    try {
      const res = await api.put(`/service/${serviceId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data;
    } catch (err) {
      return null;
    }
  };

  const deleteCompanyService = async (serviceId: string) => {
    try {
      const res = await api.delete(`/service/${serviceId}`);
      return res.data.success;
    } catch (err) {
      return false;
    }
  };

  // ================== Company ==================

  // dentro do DataProvider, junto com as outras funções

  // Buscar todas as empresas
  const getAllCompanies = async () => {
    try {
      const res = await api.get("/companies");
      if (res.data.success !== false) {
        return res.data.data || res.data; // depende do formato da resposta
      }
      return [];
    } catch (err) {
      console.error("Erro ao buscar empresas:", err);
      return [];
    }
  };

  // Buscar empresas por ownerId (gerente)
  const getCompaniesByOwner = async (ownerId: string) => {
    try {
      const res = await api.get(`/companies/${ownerId}`);
      if (res.data.success) {
        return res.data.data; // lista de { companyId, companyName }
      }
      return [];
    } catch (err) {
      console.error("Erro ao buscar empresas do dono:", err);
      return [];
    }
  };

  // Criar empresa com multipart/form-data (logo e banner)
  const createCompany = async (formData: FormData) => {
    try {
      const res = await api.post("/companies", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        return res.data.data;
      }
      return null;
    } catch (err) {
      console.error("Erro ao criar empresa:", err);
      return null;
    }
  };

  // Atualizar empresa (PUT /companies/{id})
  const updateCompany = async (companyId: string, data: any) => {
    try {
      const res = await api.put(`/companies/${companyId}`, data);
      if (res.data.success) {
        return res.data.data;
      }
      return null;
    } catch (err) {
      console.error("Erro ao atualizar empresa:", err);
      return null;
    }
  };

  // Deletar empresa
  const deleteCompany = async (companyId: string) => {
    try {
      const res = await api.delete(`/companies/${companyId}`);
      return res.data.success === true;
    } catch (err) {
      console.error("Erro ao deletar empresa:", err);
      return false;
    }
  };


  // Deletar empresa
  const payPlan = async (planId: string) => {
    try {
      const selectedSalon = getSelectedSalon()
      if(!selectedSalon) throw new Error("Nenhum salão selecionado");
      const res = await api.post(`/companies/pay`, {
        companyId: selectedSalon?.companyId,
        planId,
        description: "Assinatura Mensal"
      })
      return res.data;
    } catch (err) {
      console.error("Erro ao deletar empresa:", err);
      return false;
    }
  };

  // ======= STAFF =======

  const inviteStaff = async (identifier: string) => {
    try {
      const response = await api.post(`/companies/staff/${identifier}`, {companyId: await getSelectedSalon()});
      return response.data;
    } catch(err) {
      return err;
    }
  }


  useEffect(() => {
    if (user && user.role === "MANAGER") {
      getManagerSalons(user.id).then((ids) => setSalonsIds(ids));
    }
  }, [user]);

  return (
    <DataContext.Provider
      value={{
        user,
        salons,
        setSelectedSalon,
        getSelectedSalon,
        getManagerSalons,
        getAllPlans,

        getCompanyCategories,
        deleteCompanyCategory,
        createCompanyCategory,
        updateCompanyCategory,

        getCompanyServices,
        createCompanyService,
        updateCompanyService,
        deleteCompanyService,

        getAllCompanies,
        getCompaniesByOwner,
        createCompany,
        updateCompany,
        deleteCompany,

        payPlan,
        inviteStaff
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
