// src/components/mobile/MobileNavbar.tsx

import { Bell } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Home,
    Calendar,
    Scissors,
    User,
    Users,
    ToolCase
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { SidebarTrigger } from "../ui/sidebar";
export default function BrowserHeader() {

    const { user } = useAuth()
    const location = useLocation();

    const clientNavItems = [
        { path: "/dashboard/client", icon: Home, label: "Início" },
        { path: "/dashboard/client/services", icon: ToolCase, label: "Serviços" },
        { path: "/dashboard/client/salons", icon: Scissors, label: "Salões" },
        { path: "/dashboard/client/bookings", icon: Calendar, label: "Agendamentos" },
        { path: "/dashboard/client/profile", icon: User, label: "Perfil" },
    ];

    const managerNavItems = [
        { path: "/manager", icon: Home, label: "Dashboard" },
        { path: "/manager/services", icon: Scissors, label: "Serviços" },
        { path: "/manager/staff", icon: Users, label: "Equipe" },
        { path: "/manager/schedule", icon: Calendar, label: "Agenda" },
    ];

    const [navItems, setNavItems] = useState<any>([])

    useEffect(() => {
        switch (user?.role) {
            case "ADMIN":
                setNavItems([])
                break;
            case "USER":
                setNavItems(clientNavItems)
                break;
            case "MANAGER":
                setNavItems(managerNavItems)
                break;
            case "STAFF":
                setNavItems([])
                break;

            default:
                break;
        }
    }, [user])

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-t border flex justify-around items-center py-6 h-20">
            <div className="h-10 flex w-full justify-between items-center max-w-[1400px] px-3">
                <div className="flex gap-2 items-center">
                    <SidebarTrigger className="absolute top-0" />
                    <div className="bg-[#00c951] w-12 h-12 rounded-4xl flex justify-center items-center cursor-pointer hover:scale-110 transition-transform">
                        <p className="text-2xl text-white">{user?.username.charAt(0).toUpperCase()}</p>
                    </div>
                    <Label className="text-[1.2rem] font-semibold cursor-pointer">@{user?.username}</Label>
                </div>
                <div className="flex gap-4 items-center">

                    <ul className="flex">
                        {navItems.map((item: any) => {

                            const isActive = location.pathname === item.path

                            return (
                                <Link to={item.path} className={`px-2 py-1 transition-colors ${isActive
                                    ? "text-neutral-800 font-bold bg-neutral-300 hover:bg-neutral-200"
                                    : "text-neutral-400 bg-neutral-50 hover:bg-neutral-100"
                                    }
                                }`}>
                                    {item.label}
                                </Link>
                            )
                        })}
                    </ul>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="cursor-pointer hover:bg-neutral-200 transition-colors rounded-2xl p-2 w-[40px] h-[40px]">
                            <Bell />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-46 -translate-x-6" align="start">
                            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    Perfil
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Histórico
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Agendamentos
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Definições
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    );
}