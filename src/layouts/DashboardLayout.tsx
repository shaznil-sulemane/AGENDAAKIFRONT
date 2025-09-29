import { Outlet, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Menu, Home as HomeIcon, Settings as SettingsIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardLayout() {
  // const navigate = useNavigate();
  const {logout} = useAuth()

  const handleLogout = () => {
    logout()
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-100 p-4 border-r">
        <nav className="flex flex-col gap-4">
          <Link to="/dashboard" className="flex items-center gap-2"><HomeIcon /> Dashboard</Link>
          <Link to="/dashboard/settings" className="flex items-center gap-2"><SettingsIcon /> Configurações</Link>
          <Separator />
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </nav>
      </aside>

      {/* Sidebar Mobile */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="m-2">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <nav className="flex flex-col gap-4 mt-6">
              <Link to="/dashboard" className="flex items-center gap-2"><HomeIcon /> Dashboard</Link>
              <Link to="/dashboard/settings" className="flex items-center gap-2"><SettingsIcon /> Configurações</Link>
              <Separator />
              <Button variant="outline" onClick={handleLogout}>Logout</Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Conteúdo principal */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

