// src/context/AuthContext.tsx
import { api, ls } from "@/lib/axios";
import { createContext, useState } from "react";
import type { ReactNode } from "react";
import type { User, Auth, AuthContextType, CreateUser } from "@/lib/types";

// import { randomUUID } from "crypto";

// ================== CONTEXT ==================
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ================== PROVIDER ==================
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<Auth | null>(null);
    const [user, setUser] = useState<User | null>(null)

    const checkAvailability = async (field: "username" | "email" | "phone", value: string) => {
        try {
            const res = await api.get("/auth/availability", { params: { field, value } });
            return res.data; // { available: boolean, message?: string }
        } catch (err: any) {
            throw err?.response?.data || { available: false, message: "Erro ao verificar disponibilidade" };
        }
    };

    const getMe = async () => {
        if(auth) throw {message: "Usuário precisa estárautenticado."}
        try {
            const res = await api.get('/auth/me')
            if (res.data.success) {
                ls.set("user", res.data.data)
                setUser(res.data.data)
                return res.data
            }
            throw res.data
        } catch (err: any) {
            throw err?.response?.data
        }
    }

    // ---- LOGIN ----
    const login = async (identifier: string, password: string) => {
        if (!identifier || !password) throw {message: "Email e senha são obrigatórios"};
        try {
            const res = await api.post('/auth/login', { identifier, password })
            if (res.data.success) {
                ls.set("auth", res.data.data)
                setAuth(res.data.data)
                await getMe()
                return res.data
            }
            throw res.data
        } catch (err: any) {
            setAuth(null)
            setUser(null)
            throw err?.response?.data
        }
    };

    // ---- CRIAR USUÁRIO ----
    const signup = async (data: CreateUser) => {
        if (!data.email || !data.password) {
            throw new Error("Email e senha são obrigatórios");
        }

        try {
            const res = await api.post('/auth/signup', data)
            if (res.data.success) {
                ls.set("auth", res.data.data)
                setAuth(res.data.data)
                return res.data
            }
        } catch (err: any) {
            setAuth(null)
            setUser(null)
            throw err?.response?.data
        }
    };

    const getAuth = () => {
        if(!auth) {
            const storedAuth = ls.get("auth");
            if(storedAuth) {
                setAuth(storedAuth);
                return storedAuth;
            }
            return null;
        }
        return auth;
    }

    const getUser = () => {
        if(!user) {
            const storedUser = ls.get("user");
            if(storedUser) {
                setUser(storedUser);
                return storedUser;
            }
            return null;
        }
        return user;
    }

    // ---- LOGOUT ----
    const logout = () => {
        ls.remove("auth")
        setAuth(null);
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                user,
                getAuth,
                getUser,
                login,
                logout,
                signup,
                checkAvailability
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
