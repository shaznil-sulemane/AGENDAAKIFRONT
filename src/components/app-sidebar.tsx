import {  BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ModeToggle } from "./mode-toggle";

import { Link, useLocation } from "react-router-dom";
import { Label } from "./ui/label";
import { useAuth } from "@/hooks/useAuth";

import {
    Home,
    Calendar,
    Scissors,
    User,
    Users,
    ToolCase
} from "lucide-react";

export function AppSidebar() {
    const [active, setActive] = useState<string>("Home");
    const { isMobile } = useSidebar();

    const { user, logout } = useAuth()
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
        { path: "/manager/category", icon: Users, label: "Categorias" },
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
        <Sidebar>
            <SidebarHeader className="flex flex-row justify-between">
                <Label className="text-2xl text-green-500">AgendaAki</Label>
                <ModeToggle />
            </SidebarHeader>
            <SidebarContent
                className="bg-white text-foreground"
            >
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="flex flex-col gap-1">
                            {navItems.map((item: any) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            to={item.path}
                                            onClick={() => setActive(item.label)}
                                            className={cn(
                                                "flex items-center gap-2 p-2 rounded-lg transition-all duration-200",
                                                active === item.label
                                                    ? "in-dark:bg-[#00c951] in-dark:text-white font-semibold"
                                                    : "hover:bg-green-50 hover:translate-x-1"
                                            )}
                                        >
                                            <item.icon className="w-5 h-5 transition-colors duration-200" />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu >
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    className="h-16"
                                >
                                    <Avatar className="h-14 w-14 rounded-30 p-3 bg-black">
                                        <AvatarImage src={"/favicon.png"} alt={user?.fullName} />
                                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">{user?.fullName}</span>
                                        <span className="truncate text-xs">{user?.email}</span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                side={isMobile ? "bottom" : "right"}
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-10 w-10 rounded-30 bg-background p-2">
                                            {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                                            <AvatarFallback className="rounded-lg">{user?.fullName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">{user?.fullName}</span>
                                            <span className="truncate text-xs">{user?.email}</span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Sparkles />
                                        Upgrade to Pro
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <BadgeCheck />
                                        Account
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <CreditCard />
                                        Billing
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Bell />
                                        Notifications
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout} className="text-red-600 hover:text-red-700 focus:text-red-700 bg-red-600/10">
                                    <LogOut className="text-red-600" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
