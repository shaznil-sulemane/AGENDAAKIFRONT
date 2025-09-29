export type Role = "ADMIN" | "MANAGER" | "USER" | "STAFF";

export type Auth = {
    accessToken: string;
    refreshToken: string;
};

export type User = {
    id: string;
    username: string;
    fullName: string;
    gender: "MALE" | "FEMALE";
    email: string;
    password: string;
    role: Role;
    phone: string;
};

export type CreateUser = {
    username: string;
    fullname: string;
    password: string;
    gender: "MALE" | "FEMALE";
    email: string;
    phone: string;
    role?: string | "OTHER";
};

// Resposta genérica do backend
export type ApiResponse<T> = {
    success: boolean;
    message: string;
    data: T | null;
};

export type Company = {
    companyId: string;
    companyName: string;
}

export type AuthContextType = {
    auth: Auth | null;
    user: User | null;
    getAuth: () => Auth | null;
    getUser: () => User | null;
    login: (identifier: string, password: string) => Promise<ApiResponse<Auth>>;
    logout: () => void;
    signup: (data: CreateUser) => Promise<ApiResponse<Auth>>;
    checkAvailability: (field: "username" | "email" | "phone", value: string) => Promise<ApiResponse<any>>,
};

export type DataContextType = {
    user: User | null;
    salons: Company[] | null;
    setSelectedSalon: (salon: Company | null) => void;
    getSelectedSalon: () => Company | null;
    getManagerSalons: (managerId: string) => Promise<any[]>;

    getAllPlans: () => Promise<any>;

    getCompanyCategories: (companyId: string) => Promise<any[]>;
    deleteCompanyCategory: (categoryId: string) => Promise<boolean>;
    createCompanyCategory: (name: string) => Promise<any>;
    updateCompanyCategory: (categoryId: string, name: string) => Promise<any>;

    getCompanyServices: (companyId: string) => Promise<any[]>;
    createCompanyService: (formData: FormData) => Promise<any>;
    updateCompanyService: (serviceId: string, formData: FormData) => Promise<any>;
    deleteCompanyService: (serviceId: string) => Promise<boolean>;

    getAllCompanies: (ownerId: string) => Promise<any[]>;
    getCompaniesByOwner: (ownerId: string) => Promise<any[]>;
    createCompany: (formData: FormData) => Promise<{id: string, name: string} | null>;
    updateCompany: (companyId: string, formData: FormData) => Promise<Company | null>;
    deleteCompany: (companyId: string) => Promise<boolean>;

    payPlan: (planId: string) => Promise<any>;
    inviteStaff: (identifier: string) => Promise<any>;
};

export interface Service {
    id: string;
    name: string;
    category: string;
    durationMinutes: number; // em minutos
    price: number; // em R$
    active: boolean;
    professionals: string[]; // nomes ou ids dos profissionais
    imageUrl?: string; // opcional (caso venha da API)
    companyId?: string; // para saber de qual empresa é
    createdAt?: string;
    updatedAt?: string;
}
