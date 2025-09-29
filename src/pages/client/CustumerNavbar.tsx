// src/components/mobile/MobileNavbar.tsx
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { 
  Home, 
  Calendar, 
  Scissors, 
  User,
  BarChart2
} from "lucide-react";

export default function CustumerNavbar() {
  const { user } = useAuth();
  const location = useLocation();
  
  const isManager = user?.role === "MANAGER" || user?.role === "ADMIN";
  
  const clientNavItems = [
    { path: "/dashboard/client", icon: Home, label: "Início" },
    { path: "/dashboard/client/services", icon: Scissors, label: "Serviços" },
    { path: "/dashboard/client/salons", icon: BarChart2, label: "Salões" },
    { path: "/dashboard/client/bookings", icon: Calendar, label: "Agendamentos" },
    { path: "/dashboard/client/profile", icon: User, label: "Perfil" },
  ];
  
  const managerNavItems = [
    { path: "/manager", icon: Home, label: "Dashboard" },
    { path: "/manager/services", icon: Scissors, label: "Serviços" },
    { path: "/manager/staff", icon: User, label: "Equipe" },
    { path: "/manager/schedule", icon: Calendar, label: "Agenda" },
  ];
  
  const navItems = isManager ? managerNavItems : clientNavItems;
//   const basePath = isManager ? "/manager" : "/dashboard";

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex justify-around items-center p-2 h-16">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center p-2 rounded-lg ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Icon size={20} />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}