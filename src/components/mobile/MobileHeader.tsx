// src/components/mobile/MobileNavbar.tsx

import { Bell } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/useAuth";
import { Label } from "../ui/label";
export default function MobileHeader() {

    const {user,logout} = useAuth();
    return (
        <nav className="fixed top-0 left-0 right-0 bg-background border-t border flex justify-around items-center p-6 h-20 z-50">
            <div className="h-10 flex w-full justify-between items-center">
                <div className="flex gap-2 items-center">
                    <div className="bg-[#00c951] w-12 h-12 rounded-4xl flex justify-center items-center cursor-pointer hover:scale-110 transition-transform">
                        <p className="text-2xl text-white">{user?.fullName.substring(0,1)}</p>
                    </div>
                    <Label className="text-[1.2rem] font-semibold cursor-pointer">{`@${user?.username}`}</Label>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
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
                        <DropdownMenuItem onClick={() => logout()}>
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
}