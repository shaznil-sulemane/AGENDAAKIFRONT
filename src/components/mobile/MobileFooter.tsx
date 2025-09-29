// src/components/mobile/MobileNavbar.tsx
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { 
  Home, 
  Calendar, 
  Scissors, 
  User,
  Users,
  ToolCase
} from "lucide-react";

export default function MobileFooter() {
  const { user } = useAuth();
  const location = useLocation();
  
  const isManager = user?.role === "MANAGER" || user?.role === "ADMIN";
  
  const clientNavItems = [
    { path: "/dashboard/client", icon: Home, label: "Início" },
    { path: "/dashboard/client/services", icon: ToolCase, label: "Serviços" },
    { path: "/dashboard/client/salons", icon: Scissors, label: "Salões" },
    { path: "/dashboard/client/bookings", icon: Calendar, label: "Agendamentos" },
    { path: "/dashboard/client/profile", icon: User, label: "Perfil" },
  ];
  
  const managerNavItems = [
    { path: "/dashboard/manager", icon: Home, label: "Dashboard" },
    { path: "/dashboard/manager/services", icon: Scissors, label: "Serviços" },
    { path: "/dashboard/manager/staff", icon: Users, label: "Equipe" },
    { path: "/dashboard/manager/schedule", icon: Calendar, label: "Agenda" },
  ];
  
  const navItems = isManager ? managerNavItems : clientNavItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex justify-around items-center p-2 h-20 z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center p-2 rounded-4xl transition-all hover:-translate-y-3 ${
              isActive 
                ? "text-white bg-[#00c951] -translate-y-3" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon size={25} className="p-2 w-10 h-10"/>
            {/* <span className="text-xs mt-1">{item.label}</span> */}
          </Link>
        );
      })}
    </nav>
  );
}